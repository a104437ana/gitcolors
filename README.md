# gitcolors

## GitHub contributions graph in any color 🌈

A simple tool to **customize your GitHub contributions graph** with **any color** palette you like. Supports **dark and light mode** (auto-switching via `<picture>`), has several **built-in themes** in case you don't want a single color, and lets you display the graph as solid (just shows whether you contributed or not that day) or levels (color intensity scales with how much you contributed).

Perfect for **adding a personal touch to your README** — quick and easy, **ready in seconds** through the [website](https://gitcolors.vercel.app).

See your graph here: https://gitcolors.vercel.app
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=rainbow" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=rainbow" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=rainbow" alt="a104437ana contributions" width="1000" />
</picture>

## ⚡ Quick Setup

1. Go to https://gitcolors.vercel.app
2. Enter your GitHub username
3. Customize the graph
4. Copy the image
5. Paste into your README

## Themes
- 🌈 **Rainbow**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=rainbow" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=rainbow" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=rainbow" alt="a104437ana contributions" width="1000" />
</picture>

- 🌅 **Sunset**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=sunset" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=sunset" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=sunset" alt="a104437ana contributions" width="1000" />
</picture>

- 🌊 **Wave**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=wave" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=wave" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=wave" alt="a104437ana contributions" width="1000" />
</picture>

- 🎀 **Girly**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=girly" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=girly" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=girly" alt="a104437ana contributions" width="1000" />
</picture>

- 💻 **Dev**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=dev" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=dev" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=dev" alt="a104437ana contributions" width="1000" />
</picture>

## Without theme (any color)
- ✨ **Pink**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=none" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=none" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=none" alt="a104437ana contributions" width="1000" />
</picture>
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=levels&preset=none" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=levels&preset=none" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=levels&preset=none" alt="a104437ana contributions" width="1000" />
</picture>

## Features
- 🌈 GitHub contributions graph in any color you want
- :octocat: Updates automatically based on your GitHub activity
- 🌗 Supports both light and dark themes
- ⚡ Easy to integrate into any README or portfolio
- 💻 Dedicated website to generate and view your graph
- ✨ Beautiful preset themes like Rainbow, Sunset and more
- 📊 View contributions by intensity or simply contributed / not contributed

## API
You can also hit the API directly to generate the image, without going through the site:

`https://gitcolors.vercel.app/api/svg?username=YOUR_USERNAME&color=HEX&theme=dark|light&mode=solid|levels&preset=rainbow|sunset|wave|girly|dev`

- `color` — hex color, no `#` (used when `preset` isn't set)
- `theme` — `dark` or `light`
- `mode` — `solid` (flat color) or `levels` (intensity-based)
- `preset` — overrides `color` with a built-in palette (`rainbow`, `sunset`, `wave`, `girly`, `dev`)

## 🔧 Manual Setup
If you want an image that automatically switches between dark and light depending on the user's system theme, you can set it up like this:
```markdown
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&preset=dev" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=dev" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&preset=dev" alt="a104437ana contributions" width="1000" />
</picture>
```
Then just replace the values (`username`, `color`, `theme`, `mode`, `preset`) with whatever you'd like, following the options described in the API section above.

## Support
If you like this project, please consider giving it a star ⭐

## Stars
[![GitHub stars](https://img.shields.io/github/stars/a104437ana/gitcolors?style=social&label=Stars)](https://github.com/a104437ana/gitcolors/stargazers/)
