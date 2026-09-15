# Seif Abdelgawad — Portfolio

Personal portfolio site for **Seif Abdelgawad**, Penetration Tester & Bug Hunter — built as a single, dependency-free `index.html` (HTML + CSS + vanilla JS, no build step, no framework).

Live at: `https://seif-abdelgawad.github.io`

## What's inside

- Dark, terminal/hacker-styled UI (JetBrains Mono + Inter) matching the security-research theme
- Animated hero: canvas-based "digital rain" background, typewriter role rotator, animated stat counters
- Scroll-reveal animations, scrollspy navigation, sticky/blurred nav bar with mobile menu
- Tilt + glow micro-interactions on certification and project cards
- Auto-scrolling skills marquee
- Fully responsive, keyboard-accessible (`:focus-visible` states), and respects `prefers-reduced-motion`
- No external JS dependencies — only Google Fonts is loaded remotely; everything else is inline in `index.html`

## Local preview

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying (GitHub Pages)

This repo is named `seif-abdelgawad.github.io`, so GitHub Pages publishes it automatically from the `main` branch at the repo root — no extra configuration needed. Just make sure Pages is enabled under **Settings → Pages → Source: Deploy from branch → main / (root)**.

## TODO before going fully live

A few fields were placeholders in the original content and were carried over as-is (no data was invented):

- [ ] Replace `https://www.linkedin.com/in/your-profile` with your real LinkedIn URL (appears in the info card, nav, and contact section)
- [ ] Replace `https://github.com/your-username` with your real GitHub URL (nav, footer, contact section)
- [ ] Point each certification card's `href="#"` to its real Credly/verification link
- [ ] Point each project card's "GitHub" link to its real repository

## License

MIT — see [LICENSE](LICENSE).
