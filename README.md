# gitcolors

## GitHub contributions graph in any color 🌈

A simple tool to customize your GitHub contributions graph with any color palette you like. Perfect for adding a personal touch to your README or portfolio.

See your graph here: https://gitcolors.vercel.app
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1" alt="a104437ana contributions" width="1000" />
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
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1" alt="a104437ana contributions" width="1000" />
</picture>

- 🌅 **Sunset**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1&preset=sunset" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=sunset" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=sunset" alt="a104437ana contributions" width="1000" />
</picture>

- 🌊 **Wave**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1&preset=duotone" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=duotone" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=duotone" alt="a104437ana contributions" width="1000" />
</picture>

- 🎀 **Girly**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1&preset=girly" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=girly" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=girly" alt="a104437ana contributions" width="1000" />
</picture>

- 💻 **Dev**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=1&preset=hacker" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=hacker" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=1&preset=hacker" alt="a104437ana contributions" width="1000" />
</picture>

## Without theme (any color)
- ✨ **Pink**
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=mono&rainbow=0&preset=none" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=0&preset=none" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=mono&rainbow=0&preset=none" alt="a104437ana contributions" width="1000" />
</picture>
<picture>
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=dark&mode=levels&rainbow=0&preset=none" media="(prefers-color-scheme: dark)" />
  <source srcset="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=levels&rainbow=0&preset=none" media="(prefers-color-scheme: light)" />
  <img src="https://gitcolors.vercel.app/api/svg?username=a104437ana&color=ff2d95&theme=light&mode=levels&rainbow=0&preset=none" alt="a104437ana contributions" width="1000" />
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

## Support
If you like this project, please consider giving it a star ⭐
