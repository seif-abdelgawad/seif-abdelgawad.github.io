# Seif Abdelgawad — Portfolio

Personal portfolio site for **Seif Abdelgawad**, Network Security Engineer — built as dependency-free HTML + CSS + vanilla JS (no build step, no framework).

Live at: `https://seif-abdelgawad.github.io`

## What's inside

- Dark, terminal/hacker-styled UI (JetBrains Mono + Inter) matching the security-research theme
- Animated hero: canvas-based "digital rain" background, typewriter role rotator (Network Security Engineer / Firewall Engineer / Offensive Security Engineer), animated stat counters
- Scroll-reveal animations, scrollspy navigation, sticky/blurred nav bar with mobile menu
- Tilt + glow micro-interactions on certification and project cards
- Auto-scrolling skills marquee
- A **Resume** section (professional summary, experience timeline, education, languages) plus a **Download CV (PDF)** button
- Each project card links to its own **details page** under `projects/` with a full write-up, result stats, and a LinkedIn post/video embed
- Fully responsive, keyboard-accessible (`:focus-visible` states), and respects `prefers-reduced-motion`
- Shared, non-duplicated CSS/JS: every page pulls from `assets/css/style.css` and `assets/js/site.js`
- No external JS dependencies — only Google Fonts (and, on project pages, a LinkedIn post embed) load remotely; everything else is local

## File structure

```
index.html                       homepage
projects/
  ips-detection-lab.html         project detail page
  dos-protection-lab.html        project detail page
  palo-alto-migration.html       project detail page (has the LinkedIn post/video embed)
assets/
  css/style.css                  shared styles for every page
  js/site.js                     shared behavior for every page
  cv/Seif-Abdelgawad-CV.pdf      downloadable CV
```

## Local preview

Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying (GitHub Pages)

This repo is named `seif-abdelgawad.github.io`, so GitHub Pages publishes it automatically from the `main` branch at the repo root — no extra configuration needed. Just make sure Pages is enabled under **Settings → Pages → Source: Deploy from branch → main / (root)**.

## TODO before going fully live

A couple of fields are still placeholders and were carried over as-is rather than invented:

- [ ] Replace every `https://github.com/your-username` with your real GitHub profile URL (nav, footer, contact section, and each project's "View on GitHub" link)
- [ ] Point each certification card's `href="#"` to its real Credly/verification link
- [ ] Point each project's "View on GitHub" link to its real repository
- [ ] Add the LinkedIn post/video embed for the IPS Detection Lab and DoS Protection Lab detail pages (currently a "coming soon" placeholder) — swap the `<div class="coming-soon">…</div>` block in each file for the same kind of `<iframe>` used on the Palo Alto page once you have those post links

## License

MIT — see [LICENSE](LICENSE).
