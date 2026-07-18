export const config = {
  runtime: 'edge',
};

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function isValidHex(hex) {
  return /^[0-9a-fA-F]{6}$/.test(hex);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

// h em graus (0-360), s e l em 0-100. Devolve hex, tal como no preview do frontend.
function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

// azul (240) à esquerda -> vermelho (0) à direita, igual ao preview do frontend
function hueForPosition(wi, total) {
  if (total <= 1) return 240;
  return 240 - (wi / (total - 1)) * 240;
}

function getFillForLevel(level, mode, activeColor, rgb, emptyStroke) {
  if (level === 0) return { fill: 'none', stroke: emptyStroke };

  if (mode === 'levels') {
    const opacities = { 1: 0.3, 2: 0.55, 3: 0.78, 4: 1 };
    const opacity = opacities[level];
    const fill = opacity === 1 ? activeColor : `rgba(${rgb},${opacity})`;
    return { fill, stroke: fill };
  }

  // solid mode: qualquer contribuição = cor cheia, sem gradiente
  return { fill: activeColor, stroke: activeColor };
}

function getFillForRainbowCell(level, mode, hue, emptyOpacity) {
  const cellHex = hslToHex(hue, 70, 55);
  const cellRgb = hexToRgb(cellHex.slice(1));

  if (level === 0) {
    return { fill: 'none', stroke: `rgba(${cellRgb},${emptyOpacity})` };
  }

  if (mode === 'levels') {
    const opacities = { 1: 0.3, 2: 0.55, 3: 0.78, 4: 1 };
    const opacity = opacities[level];
    const fill = opacity === 1 ? cellHex : `rgba(${cellRgb},${opacity})`;
    return { fill, stroke: fill };
  }

  // solid mode: cor cheia do arco-íris para essa coluna, sem gradiente
  return { fill: cellHex, stroke: cellHex };
}

function generateSVG(weeks, theme, colorHex, mode, rainbow) {
  const isDark = theme === 'dark';
  const activeColor = `#${colorHex}`;
  const rgb = hexToRgb(colorHex);
  const emptyStroke = `rgba(${rgb},0.4)`;
  const textColor = isDark ? '#ffffff' : '#000000';
  const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";

  const cellSize = 11, gap = 2, step = cellSize + gap;
  const paddingLeft = 28, paddingTop = 20, paddingRight = 14, paddingBottom = 14;
  const graphW = weeks.length * step;
  const W = graphW + paddingLeft + paddingRight;
  const H = 7 * step + paddingTop + paddingBottom;

  let cells = '';
  let monthLabels = '';
  let lastMonth = -1;
  let lastLabelWeek = -10;

  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays.find(d => d.date);
    if (firstDay) {
      const date = new Date(firstDay.date);
      const m = date.getMonth();
      const d = date.getDate();
      if (m !== lastMonth && d <= 7 && (wi - lastLabelWeek) > 2) {
        const x = paddingLeft + wi * step;
        monthLabels += `<text x="${x}" y="${paddingTop - 8}" font-size="9" fill="${textColor}" font-family="${fontFamily}">${MONTHS[m]}</text>`;
        lastMonth = m;
        lastLabelWeek = wi;
      }
    }

    const hue = rainbow ? hueForPosition(wi, weeks.length) : null;

    week.contributionDays.forEach(day => {
      const dow = new Date(day.date).getDay();
      const x = paddingLeft + wi * step;
      const y = paddingTop + dow * step;
      const level = getLevel(day.contributionCount);
      const { fill, stroke } = rainbow
        ? getFillForRainbowCell(level, mode, hue, 0.35)
        : getFillForLevel(level, mode, activeColor, rgb, emptyStroke);

      if (level > 0) {
        cells += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${fill}" />`;
      } else {
        cells += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="none" stroke="${stroke}" stroke-width="1" />`;
      }
    });
  });

  const dayNames = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  let dayLabels = '';
  dayNames.forEach((d, i) => {
    if (d) dayLabels += `<text x="${paddingLeft - 4}" y="${paddingTop + i * step + cellSize - 2}" font-size="8" fill="${textColor}" font-family="${fontFamily}" text-anchor="end">${d}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="10" fill="transparent" />
  ${monthLabels}
  ${dayLabels}
  ${cells}
</svg>`;
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const theme = searchParams.get('theme') === 'dark' ? 'dark' : 'light';
  const modeParam = searchParams.get('mode');
  const mode = (modeParam === 'mono' || modeParam === 'solid') ? 'solid' : 'levels';
  const rainbowParam = searchParams.get('rainbow');
  const rainbow = rainbowParam === '1' || rainbowParam === 'true';
  let color = (searchParams.get('color') || '6c63ff').replace('#', '');

  if (!username) {
    return new Response('Username required', { status: 400 });
  }

  if (!isValidHex(color)) {
    color = '6c63ff';
  }

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(today.getDate() - 365);
  const fromDate = oneYearAgo.toISOString();
  const toDate = today.toISOString();

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        login
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username, from: fromDate, to: toDate },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.data) {
      return new Response(data.message || 'GitHub API error', { status: response.status >= 400 ? response.status : 502 });
    }
    if (data.errors || !data.data.user) {
      return new Response('User not found', { status: 404 });
    }

    const cal = data.data.user.contributionsCollection.contributionCalendar;
    const svg = generateSVG(cal.weeks, theme, color, mode, rainbow);

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response('Error generating SVG', { status: 500 });
  }
}
