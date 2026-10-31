# Yasir Abed Rabbu — Portfolio

Single-page portfolio for Yasir Abed Rabbu, UI/UX designer, built as a statically exported Next.js app.

## Stack

- **Next.js 16** (App Router, `output: "export"`) with **React 19**
- **Tailwind CSS v4**, with design tokens in `src/styles/theme-*.css` imported from `src/app/globals.css`
- **GSAP + ScrollTrigger** (via `@gsap/react`) and **Lenis** for scroll-driven motion
- **Three.js** for the hero wireframe scene and the particle name in the contact section
- Fonts: Manrope (Google) plus locally hosted Cabinet Grotesk, wired up in `src/lib/fonts.ts`

## Structure

- `src/app/page.tsx` — renders the page
- `src/components/portfolio/Portfolio.tsx` — the page itself (header, sections, contact, footer)
- `src/components/portfolio/HeroScene.tsx`, `NameParticles.tsx` — WebGL/canvas decorations
- `src/components/layout/SmoothScroll.tsx` — Lenis ↔ ScrollTrigger sync
- `src/data/*` — all copy and content

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check, lint and export the static site to `out/`
- `npm run start` — serve the production build
- `npm run lint` — run ESLint

## Deploy

`npm run build` emits a fully static site to `out/`, so it can be hosted on any static host (Vercel, Netlify, GitHub Pages, S3, …).
