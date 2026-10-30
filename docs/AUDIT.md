# Portfolio Audit — `fix/portfolio-audit`

Audit only. No code was changed to produce this document.

**Scope:** everything under `src/` plus `public/` assets and `next.config.ts`.
**Method:** full read of every source file, `npx tsc --noEmit` (clean), `npm run lint` (0 errors, 1 warning), plus targeted greps for symbol usage and dead assets. Every claim below carries the file and line evidence it was derived from.

**Context that affects several findings:** `next.config.ts` L9 sets `output: "export"` and L10–L12 sets `images.unoptimized: true`. The site is a static export with no Next.js image optimizer and no server runtime, so `next/image` does not optimize and anything server-rendered at request time (OG image, robots, sitemap) has to be prebuilt.

---

## 1. Unused / dead files and exports

### F1 — `src/lib/perf.ts` is entirely dead code — **High**
[perf.ts](file:///Users/betopiamac/Mastercode/src/lib/perf.ts#L1-L50) exports `isLowPower`, `cappedDpr`, `observeOnScreen` and `animateOnScreen`, and none of them is imported anywhere (`grep "from \"@/lib/perf\""` → 0 hits). The file is also untracked in git (`git ls-files --error-unmatch src/lib/perf.ts` → *did not match any file(s) known to git*).

Its responsibilities were re-implemented inline instead:

| `perf.ts` export | Inline duplicate |
| --- | --- |
| `cappedDpr(max)` L10–13 | [liquidScene.ts L7](file:///Users/betopiamac/Mastercode/src/components/portfolio/liquidScene.ts#L7) `Math.min(window.devicePixelRatio, 1.5)` |
| `cappedDpr(max)` L10–13 | [preloaderScene.ts L13](file:///Users/betopiamac/Mastercode/src/components/portfolio/preloaderScene.ts#L13) `Math.min(window.devicePixelRatio, 1.5)` |
| `cappedDpr(max)` L10–13 | [HeroScene.tsx L15](file:///Users/betopiamac/Mastercode/src/components/portfolio/HeroScene.tsx#L15) `Math.min(window.devicePixelRatio, 2)` — note the uncapped-on-low-power `2` |
| `observeOnScreen` / `animateOnScreen` L16–50 | [useLiquidImage.ts L41–53](file:///Users/betopiamac/Mastercode/src/components/portfolio/useLiquidImage.ts#L41-L53) hand-rolled rAF start/stop |

Two consequences worth separate tracking:
- **F1a — High:** `HeroScene.tsx` L58–71 runs a `requestAnimationFrame` loop with no visibility gate at all, unlike `useLiquidImage.ts` L50–67 which pauses off-screen. The hero WebGL scene keeps rendering after you scroll past it (and while the tab is backgrounded, since there is no `visibilitychange`/`document.hidden` check). `perf.ts` was evidently written to solve exactly this and is unused.
- **F1b — Medium:** the DPR ceiling is inconsistent (1.5 vs 2) and the low-power branch in `perf.ts` L12 is never applied, so low-end phones still get DPR 2 in the hero.

### F2 — `src/data/*` icon fields are never read; the 8 SVG assets are dead — **Medium**
- [process.ts L14, L21, L28, L35](file:///Users/betopiamac/Mastercode/src/data/process.ts#L14-L35) sets `icon` to `/icons/process-0N-*.svg`, but [Process.tsx L11](file:///Users/betopiamac/Mastercode/src/components/portfolio/Process.tsx#L11) uses its own local `processIcons` Hugeicons array instead. Nothing reads `ProcessStep.icon` (only definition hits, no read sites).
- [site.ts L1, L14–L17](file:///Users/betopiamac/Mastercode/src/data/site.ts#L1-L17) declares `SocialLink.icon`, but consumers read only `name`/`href` ([Contact.tsx L75](file:///Users/betopiamac/Mastercode/src/components/portfolio/Contact.tsx#L75), [Footer.tsx L47–53](file:///Users/betopiamac/Mastercode/src/components/portfolio/Footer.tsx#L47-L53)). Contact draws its own Hugeicons.
- Therefore all 8 files in `public/icons/` (`process-01..04`, `social-behance/dribbble/linkedin/x`) are unreferenced from any rendered code path.

### F3 — Unused design tokens and keyframes — **Low**
Tokens declared but never consumed (grep matched only their own definition line):

| File | Lines | Tokens |
| --- | --- | --- |
| [theme-typography.css](file:///Users/betopiamac/Mastercode/src/styles/theme-typography.css#L6-L62) | L6, L9–62 | `--font-ui`, the whole `--text-hero`/`--text-display`/`--text-h1…h6`/`--text-stat`/`--text-cta-xl`/`--text-body*`/`--text-quote-name`/`--text-caption`/`--text-note`/`--text-label` scale |
| [theme-layout.css](file:///Users/betopiamac/Mastercode/src/styles/theme-layout.css#L5-L28) | L5, L8–28 | `--container-shell`, `--spacing-*`, `--radius-card/frame/pill/cta/oval/avatar` |
| [theme-motion.css](file:///Users/betopiamac/Mastercode/src/styles/theme-motion.css#L6-L9) | L6–9 | `--ease-spring` |
| [theme-colors.css](file:///Users/betopiamac/Mastercode/src/styles/theme-colors.css#L6-L39) | L6, L8, L10, L20, L25, L36–39 | `--color-brand-active`, `--color-accent-hover`, `--color-cta-hover`, `--color-surface-hover`, `--color-ink-muted`, `--color-hair-warm`, `--color-hair-dark`, `--color-hair-card`, `--color-hair-logo` |
| [globals.css L77](file:///Users/betopiamac/Mastercode/src/app/globals.css#L77) | L77 | `@keyframes marquee` |

Components use Tailwind's built-in scale (`text-5xl`, `text-7xl`, `rounded-full`), so the custom typography/layout scales are bypassed. Because `@theme` emits these as real custom properties, they add CSS weight for nothing.

### Verified NOT dead — correcting the brief's assumptions
- `src/lib/useScrollTicks.ts` — **used**: imported and called at [Portfolio.tsx L4, L22](file:///Users/betopiamac/Mastercode/src/components/portfolio/Portfolio.tsx#L4-L22).
- `src/lib/clickSound.ts` — **used**: [Header.tsx L6](file:///Users/betopiamac/Mastercode/src/components/portfolio/Header.tsx#L6), [MobileNav.tsx L6](file:///Users/betopiamac/Mastercode/src/components/portfolio/MobileNav.tsx#L6), [useScrollTicks.ts L4](file:///Users/betopiamac/Mastercode/src/lib/useScrollTicks.ts#L4).

---

## 2. Duplicate data and duplicated logic

### F4 — Nav list duplicated and already diverged — **Medium**
[Footer.tsx L5–L12](file:///Users/betopiamac/Mastercode/src/components/portfolio/Footer.tsx#L5-L12) redeclares a local `nav` array while [site.ts L4–L10](file:///Users/betopiamac/Mastercode/src/data/site.ts#L4-L10) already exports the shared `nav`, which `Header.tsx` (L10) and `MobileNav.tsx` (L9) use. The two copies have already drifted: the footer adds `["Contact", "#contact"]` (L11) and the shared list does not. Adding/removing a section now requires editing two places, and they are not equal today.

### F5 — Scroll-lock implemented twice, uncoordinated — **Medium**
Two independent implementations of the same `documentElement`/`body` overflow toggle:
- [MobileNav.tsx L12–L15](file:///Users/betopiamac/Mastercode/src/components/portfolio/MobileNav.tsx#L12-L15) (`release`) + L22–24 (lock) + L31 (release on cleanup).
- [Preloader.tsx L20–L25](file:///Users/betopiamac/Mastercode/src/components/portfolio/Preloader.tsx#L20-L25) (local `unlock` + lock) + L30, L42, L76 (`unlock` calls).

Both write the same two inline styles and neither knows about the other, so whichever runs last decides the final state. A single shared helper (e.g. in `src/lib`) would remove the hazard. No shared helper exists today.

### F6 — `Contact.tsx` couples local `socials` to `socialLinks` by array index — **Low**
[socials L19–L24](file:///Users/betopiamac/Mastercode/src/components/portfolio/Contact.tsx#L19-L24) and [socialLinks L13–L18](file:///Users/betopiamac/Mastercode/src/data/site.ts#L13-L18) are joined only by position at [Contact.tsx L75](file:///Users/betopiamac/Mastercode/src/components/portfolio/Contact.tsx#L75) (`socialLinks[i].href`). The orders match today, but reordering or filtering either array silently pairs the wrong icon with the wrong URL. Label text already differs (`Linkedin` vs `LinkedIn`), which is the kind of drift that makes index joining unsafe.

---

## 3. Deprecation warnings

### F7 — `THREE.Clock` logs a deprecation warning in two scenes — **High (noise) / Low (impact)**
`three` is pinned to `^0.185.1` ([package.json L20](file:///Users/betopiamac/Mastercode/package.json#L20)), and in this version `Clock` is deprecated:
- `node_modules/three/src/core/Clock.js` L6 `@deprecated since r183`
- L61 `warn( 'Clock: This module has been deprecated. Please use THREE.Timer instead.' )` — fires in the constructor.

Call sites:
- [HeroScene.tsx L59](file:///Users/betopiamac/Mastercode/src/components/portfolio/HeroScene.tsx#L59) `new THREE.Clock()` → `getElapsedTime()` at L61.
- [preloaderScene.ts L75](file:///Users/betopiamac/Mastercode/src/components/portfolio/preloaderScene.ts#L75) `new THREE.Clock()` → `getDelta()` at L79.

Both will print a console warning in dev and in production. `HeroScene` and the preloader each construct one, so the warning can appear twice per load.

---

## 4. Missing metadata

Evidence: [layout.tsx L11–L19](file:///Users/betopiamac/Mastercode/src/app/layout.tsx#L11-L19) is the only metadata in the project, and `grep "metadataBase|canonical|icons:|alternates"` across `src/` returns nothing.

| Item | Status | Evidence |
| --- | --- | --- |
| `og:image` / `twitter:image` | **Missing** | L14 sets `openGraph` with `title/description/type` but no `images`; L15 `twitter.card` is `"summary_large_image"` (L15) which requires an image to render. |
| `metadataBase` | **Missing** | Not present anywhere. Without it, any relative `openGraph.images` cannot be resolved to an absolute URL, so L14 would still not produce a valid `og:image`. |
| canonical URL | **Missing** | No `alternates.canonical`. |
| icons / favicon | **Missing** | No `icons` field, and no `src/app/icon.*`, `favicon.ico`, `apple-icon.*` or `opengraph-image.*` exist (verified by directory listing). A browser request for `/favicon.ico` will 404. |
| `robots.txt` / `sitemap.xml` | **Missing** | Neither `public/robots.txt` nor `public/sitemap.xml` exists. |
| `viewport` / `themeColor` | **Missing** | No `viewport` export; relevant because there is a `bg-deep`/`ink` dark chrome. |
| `lang` | **Present — not a defect** | [layout.tsx L23](file:///Users/betopiamac/Mastercode/src/app/layout.tsx#L23) `<html lang="en">`. |

Suggested values that require your own data (do not invent):
```tsx
metadataBase: new URL("[X]")            // TODO(yasir): confirm the production origin
alternates: { canonical: "/" }
openGraph: { images: ["[X]"] }          // TODO(yasir): supply a real 1200x630 OG image path
icons: { icon: "[X]" }                  // TODO(yasir): supply the favicon file
```

---

## 5. Accessibility gaps

### F8 — Flip portrait drops keyboard focus — **High**
[HeroPortrait.tsx L70–L78](file:///Users/betopiamac/Mastercode/src/components/portfolio/HeroPortrait.tsx#L70-L78): the "flip" control is a full-card `<button>`; on flip it becomes `inert={flipped}` (L73). The back panel is `inert={!flipped}` (L34). When `flipped` toggles (L18, L72, L64), the element that currently holds focus becomes `inert`, so focus is discarded to `<body>` rather than moving to the revealed content. A keyboard user has to re-enter the card from the top of the page each time. There is no `useEffect` moving focus to the "Back to portrait" button (L64) or to the contact list on state change.

### F9 — Skills tab panel is focusable with no visible focus indicator — **Medium**
[Skills.tsx L76](file:///Users/betopiamac/Mastercode/src/components/portfolio/Skills.tsx#L76): the `role="tabpanel"` div has `tabIndex={0}` but no `focus-visible` styling. Every other control in the project applies the shared `focus` helper from [ui.ts L4](file:///Users/betopiamac/Mastercode/src/lib/ui.ts#L4) (or equivalent explicit classes, e.g. [Shots.tsx L20, L30](file:///Users/betopiamac/Mastercode/src/components/portfolio/Shots.tsx#L20-L30)); this element is the outlier. [globals.css](file:///Users/betopiamac/Mastercode/src/app/globals.css#L7-L63) defines no global `:focus-visible` rule, so there is no fallback ring.

### F10 — Skills tablist keyboard support is arrow-keys only — **Low**
[Skills.tsx L39–L45](file:///Users/betopiamac/Mastercode/src/components/portfolio/Skills.tsx#L39-L45) handles `ArrowUp/Down/Left/Right` with roving `tabIndex` (L57), which is correct, but `Home`/`End` are not handled and the panel swap (L76–L94) is not announced (`aria-live` absent), so the change is silent for screen-reader users.

### F11 — Hero `h1` split text: masked correctly, but the text exists twice — **Low**
[Hero.tsx L34–L43](file:///Users/betopiamac/Mastercode/src/components/portfolio/Hero.tsx#L34-L43). The three visible lines are `aria-hidden` (L37) and a matching `sr-only` sentence is provided (L35), so this is **not** a defect — assistive tech reads one sentence, not fragments. The only real finding is that the same headline is authored twice: the literal string at L35 and the array at L36 must be edited together or they will diverge.

### F12 — Pointer-only parallax has no non-pointer equivalent — **Low (decorative)**
[Hero.tsx L15–L20](file:///Users/betopiamac/Mastercode/src/components/portfolio/Hero.tsx#L15-L20) and [Contact.tsx L47–L52](file:///Users/betopiamac/Mastercode/src/components/portfolio/Contact.tsx#L47-L52) drive transforms from `onPointerMove`. Purely decorative and correctly gated by `prefersReducedMotion()` (Hero L16, Contact L48), so no action is required beyond noting it is unreachable for keyboard/AT users by design.

---

## 6. Preloader blocking content

### F13 — Preloader is time-gated, not load-gated — **High**
[Preloader.tsx L39–L71](file:///Users/betopiamac/Mastercode/src/components/portfolio/Preloader.tsx#L39-L71) is a fixed-length GSAP timeline (curtain wipe at L71 begins at t≈2.3s, completes shortly after) that tweens the counter to 100 (L51) on its own schedule. Nothing in it is tied to actual asset readiness, so: on a fast connection the visitor still waits through the full animation, and on a slow one the reveal can happen before images/fonts are ready.

### F14 — No unlock path if the scene fails to initialise — **High**
[Preloader.tsx L24–L25](file:///Users/betopiamac/Mastercode/src/components/portfolio/Preloader.tsx#L24-L25) sets `overflow: hidden` on `documentElement` and `body` *before* `createPreloaderScene(host)` is called at L33. If L33 throws (no WebGL / context-limit reached — note this page already creates a hero context, three liquid-image contexts and the preloader context), the timeline at L39 is never created, so `onComplete` (L40–L43) never fires and the cleanup `unlock()` (L76) is never registered. Result: the overlay stays and the page remains unscrollable. There is also no skip control or timeout fallback for the same reason.

### F15 — Preloader overlay is `aria-hidden` while it blocks — **Medium**
[Preloader.tsx L83](file:///Users/betopiamac/Mastercode/src/components/portfolio/Preloader.tsx#L83): the whole overlay is `aria-hidden`. Because it is `position: fixed; inset: 0; z-[200]` and only *visually* blocks, assistive tech can still traverse and activate the header/main content behind it during the ~3s window, while sighted users cannot. The reduced-motion branch (L27–L31) unpins correctly, so this only affects the animated path.

---

## Summary

| # | Finding | File | Severity |
| --- | --- | --- | --- |
| F13 | Preloader is time-gated, not load-gated | Preloader.tsx L39–L71 | High |
| F14 | No unlock if preloader scene throws | Preloader.tsx L24–25, L33, L76 | High |
| F8 | Flip portrait discards keyboard focus | HeroPortrait.tsx L34, L70–78 | High |
| F1 | `perf.ts` dead + inline DPR/visibility duplicates | perf.ts L1–50; liquidScene L7; preloaderScene L13; HeroScene L15; useLiquidImage L41–53 | High |
| F1a | Hero rAF loop never pauses off-screen/background | HeroScene.tsx L58–71 | High |
| F7 | `THREE.Clock` deprecation warning | HeroScene.tsx L59; preloaderScene.ts L75 | High (noise) |
| F4 | Nav list duplicated and diverged | Footer.tsx L5–12 vs site.ts L4–10 | Medium |
| F5 | Scroll-lock implemented twice, uncoordinated | MobileNav.tsx L12–15, L22–24; Preloader.tsx L20–25 | Medium |
| F2 | Unused `icon` fields + 8 dead SVGs | process.ts L14–35; site.ts L1, L14–17; public/icons/* | Medium |
| F9 | Tab panel focusable with no focus ring | Skills.tsx L76 | Medium |
| F15 | Preloader `aria-hidden` while blocking | Preloader.tsx L83 | Medium |
| F1b | DPR ceiling inconsistent / low-power branch unused | HeroScene.tsx L15 vs liquidScene.ts L7 | Medium |
| — | Missing `og:image`, `metadataBase`, canonical, icons, robots/sitemap | layout.tsx L11–19 | Medium |
| F3 | Unused design tokens + `marquee` keyframes | theme-*.css; globals.css L77 | Low |
| F10 | Tablist lacks Home/End and live announcement | Skills.tsx L39–45, L76 | Low |
| F11 | Hero `h1` text authored twice | Hero.tsx L35–36 | Low |
| F6 | `socials` ↔ `socialLinks` index coupling | Contact.tsx L19–24, L75 | Low |
| F12 | Pointer-only parallax (decorative) | Hero.tsx L15–20; Contact.tsx L47–52 | Low |

**Correcting assumptions in the brief:** `useScrollTicks.ts` and `clickSound.ts` are both in active use (F-section "Verified NOT dead"); `<html lang="en">` is already present at `layout.tsx` L23; and the hero `h1` split is already masked with an `sr-only` duplicate, so it is not an a11y defect as written.
