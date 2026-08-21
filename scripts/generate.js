import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";

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

function hexToRgbArr(hex) {
  hex = hex.replace('#', '');
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

// interpola entre stops de cor (hex), t entre 0 e 1 — igual ao preview do frontend
function interpolateStops(stops, t) {
  t = Math.max(0, Math.min(1, t));
  if (stops.length === 1) return stops[0];
  const scaled = t * (stops.length - 1);
  const idx = Math.min(stops.length - 2, Math.floor(scaled));
  const localT = scaled - idx;
  const c1 = hexToRgbArr(stops[idx]);
  const c2 = hexToRgbArr(stops[idx + 1]);
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * localT);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * localT);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * localT);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
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

function hexToHsl(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

const RAINBOW2_PINK_HEX = '#ff2d95';

// roxo -> azul -> vermelho -> rosa (#ff2d95, exato); a secção interior replica o rainbow original
function rainbow2Hex(wi, total) {
  const t = total <= 1 ? 0 : wi / (total - 1);
  const segStart = 0.15, segEnd = 0.85;
  if (t < segStart) {
    const localT = t / segStart;
    const hue = 280 - localT * (280 - 240);
    return hslToHex(hue, 70, 55);
  }
  if (t > segEnd) {
    const localT = (t - segEnd) / (1 - segEnd);
    const [pinkH, pinkS, pinkL] = hexToHsl(RAINBOW2_PINK_HEX);
    let hue = localT * (pinkH - 360);
    if (hue < 0) hue += 360;
    const sat = 70 + (pinkS - 70) * localT;
    const light = 55 + (pinkL - 55) * localT;
    return hslToHex(hue, sat, light);
  }
  const localT = (t - segStart) / (segEnd - segStart);
  const hue = 240 - localT * 240;
  return hslToHex(hue, 70, 55);
}

// presets nomeados, iguais à lógica do THEMES do index.html
const PRESETS = {
  sunset: {
    darkStops: ['#3a0ca3', '#e0218a', '#ff6b35', '#ffd23f'],
    lightStops: ['#8d6fc7', '#f2a6c9', '#ffb37a', '#ffe08a'],
    getHex(wi, total, dow, isDark) {
      const stops = isDark ? this.darkStops : this.lightStops;
      const t = total <= 1 ? 0 : wi / (total - 1);
      return interpolateStops(stops, t);
    },
  },
  wave: {
    stops: ['#0ea5e9', '#7c3aed'],
    getHex(wi, total, dow) {
      const t = (dow || 0) / 6;
      return interpolateStops(this.stops, t);
    },
  },
  girly: {
    stops: ['#ff5da2', '#e05fd0', '#a855f7', '#7c3aed'],
    getHex(wi, total) {
      const t = total <= 1 ? 0 : wi / (total - 1);
      return interpolateStops(this.stops, t);
    },
  },
  dev: {
    stops: ['#1c7a3c', '#8dff6e'],
    getHex(wi, total, dow) {
      const t = 1 - (dow || 0) / 6;
      return interpolateStops(this.stops, t);
    },
  },
};

function getFillForLevel(level, mode, activeColor, rgb, emptyColor, neutralStroke) {
  if (level === 0) {
    const stroke = emptyColor === 'neutral' ? neutralStroke : `rgba(${rgb},0.4)`;
    return { fill: 'none', stroke };
  }

  if (mode === 'levels') {
    const opacities = { 1: 0.3, 2: 0.55, 3: 0.78, 4: 1 };
    const opacity = opacities[level];
    const fill = opacity === 1 ? activeColor : `rgba(${rgb},${opacity})`;
    return { fill, stroke: fill };
  }

  // solid mode: qualquer contribuição = cor cheia, sem gradiente
  return { fill: activeColor, stroke: activeColor };
}

function getFillForRainbowCell(level, mode, hue, emptyColor, neutralStroke) {
  const cellHex = hslToHex(hue, 70, 55);
  const cellRgb = hexToRgb(cellHex.slice(1));

  if (level === 0) {
    const stroke = emptyColor === 'neutral' ? neutralStroke : `rgba(${cellRgb},0.35)`;
    return { fill: 'none', stroke };
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

function getFillForPresetCell(level, mode, hex, emptyColor, neutralStroke) {
  const rgb = hexToRgb(hex.replace('#', ''));

  if (level === 0) {
    const stroke = emptyColor === 'neutral' ? neutralStroke : `rgba(${rgb},0.35)`;
    return { fill: 'none', stroke };
  }

  if (mode === 'levels') {
    const opacities = { 1: 0.3, 2: 0.55, 3: 0.78, 4: 1 };
    const opacity = opacities[level];
    const fill = opacity === 1 ? hex : `rgba(${rgb},${opacity})`;
    return { fill, stroke: fill };
  }

  // solid mode: cor cheia do preset para essa célula, sem gradiente
  return { fill: hex, stroke: hex };
}

function generateSVG(weeks, theme, colorHex, mode, preset, animate, emptyColor) {
  const isDark = theme === 'dark';
  const activeColor = `#${colorHex}`;
  const rgb = hexToRgb(colorHex);
  // 'neutral' = cinza dependente só do tema, independente da cor ativa; 'tint' (default) = tom da cor ativa
  const neutralStroke = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)';
  const textColor = isDark ? '#ffffff' : '#000000';

  const cellSize = 11, gap = 2, step = cellSize + gap;
  const paddingLeft = 28, paddingTop = 20, paddingRight = 14, paddingBottom = 14;
  const graphW = weeks.length * step;
  const W = graphW + paddingLeft + paddingRight;
  const H = 7 * step + paddingTop + paddingBottom;

  const isRainbow = preset === 'rainbow' || preset === 'rainbow2';
  const presetTheme = preset && !isRainbow ? PRESETS[preset] : null;

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
        monthLabels += `<text x="${x}" y="${paddingTop - 8}" font-size="9" fill="${textColor}" font-family="${FONT_FAMILY}">${MONTHS[m]}</text>`;
        lastMonth = m;
        lastLabelWeek = wi;
      }
    }

    const hue = (isRainbow && !presetTheme && preset === 'rainbow2')
      ? hueForPosition(wi, weeks.length)
      : null;
    const purplePinkCellHex = (isRainbow && !presetTheme && preset === 'rainbow')
      ? rainbow2Hex(wi, weeks.length)
      : null;

    week.contributionDays.forEach(day => {
      const dow = new Date(day.date).getDay();
      const x = paddingLeft + wi * step;
      const y = paddingTop + dow * step;
      const level = getLevel(day.contributionCount);
      const delay = wi * 20 + dow * 10;
      const animStyle = animate ? ` style="animation:cellWave .3s linear ${delay}ms both"` : '';

      let fill, stroke;
      if (presetTheme) {
        const cellHex = presetTheme.getHex(wi, weeks.length, dow, isDark);
        ({ fill, stroke } = getFillForPresetCell(level, mode, cellHex, emptyColor, neutralStroke));
      } else if (purplePinkCellHex) {
        ({ fill, stroke } = getFillForPresetCell(level, mode, purplePinkCellHex, emptyColor, neutralStroke));
      } else if (isRainbow) {
        ({ fill, stroke } = getFillForRainbowCell(level, mode, hue, emptyColor, neutralStroke));
      } else {
        ({ fill, stroke } = getFillForLevel(level, mode, activeColor, rgb, emptyColor, neutralStroke));
      }

      if (level > 0) {
        cells += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${fill}"${animStyle} />`;
      } else {
        cells += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="none" stroke="${stroke}" stroke-width="1"${animStyle} />`;
      }
    });
  });

  const dayNames = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  let dayLabels = '';
  dayNames.forEach((d, i) => {
    if (d) dayLabels += `<text x="${paddingLeft - 4}" y="${paddingTop + i * step + cellSize - 2}" font-size="8" fill="${textColor}" font-family="${FONT_FAMILY}" text-anchor="end">${d}</text>`;
  });

  const style = animate ? `<style>@keyframes cellWave{from{opacity:0}to{opacity:1}}</style>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${style}
  <rect width="${W}" height="${H}" rx="10" fill="transparent" />
  ${monthLabels}
  ${dayLabels}
  ${cells}
</svg>`;
}

async function fetchContributions(username, token) {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(today.getDate() - 365);

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
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: oneYearAgo.toISOString(),
        to: today.toISOString(),
      },
    }),
  });

  const data = await response.json();

  if (data.errors || !data.data?.user) {
    throw new Error(`User "${username}" not found or token invalid.`);
  }

  return data.data.user.contributionsCollection.contributionCalendar;
}

async function main() {
  const username = process.env.GITHUB_REPOSITORY_OWNER;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    console.error('Error: missing GITHUB_REPOSITORY_OWNER or GITHUB_TOKEN');
    process.exit(1);
  }

  let color = (process.env.GITCOLORS_COLOR || '6c63ff').replace('#', '');
  if (!isValidHex(color)) color = '6c63ff';
  const mode = process.env.GITCOLORS_MODE === 'levels' ? 'levels' : 'solid';
  const presetParam = process.env.GITCOLORS_PRESET;
  const VALID_PRESETS = ['rainbow', 'rainbow2', 'sunset', 'wave', 'girly', 'dev'];
  const preset = VALID_PRESETS.includes(presetParam) ? presetParam : null;
  const animate = process.env.GITCOLORS_ANIMATE !== 'false';
  const emptyColor = process.env.GITCOLORS_EMPTY_COLOR === 'neutral' ? 'neutral' : 'tint';

  console.log(`Fetching contributions for ${username}...`);

  const cal = await fetchContributions(username, token);
  console.log(`Total contributions: ${cal.totalContributions}`);

  // os SVGs são gerados na raiz do repo do utilizador (GITHUB_WORKSPACE)
  const workspace = process.env.GITHUB_WORKSPACE ?? resolve(__dirname, '../..');

  writeFileSync(resolve(workspace, 'gitcolors.svg'), generateSVG(cal.weeks, 'light', color, mode, preset, animate, emptyColor));
  writeFileSync(resolve(workspace, 'gitcolors-dark.svg'), generateSVG(cal.weeks, 'dark', color, mode, preset, animate, emptyColor));

  console.log('Done! Generated gitcolors.svg and gitcolors-dark.svg');
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
