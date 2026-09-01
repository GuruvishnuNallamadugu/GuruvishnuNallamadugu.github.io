# guruvishnunallamadugu.github.io

Personal engineering portfolio — **Guruvishnu Nallamadugu**, Mechanical Design & Manufacturing Engineer.

**Live:** https://guruvishnunallamadugu.github.io

Built with [Astro](https://astro.build) (static output), React islands, Tailwind CSS v4, and Three.js. Deployed automatically to GitHub Pages on every push to `main`.

---

## Running it locally

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:4321.

| Command           | Does                                       |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the dev server with hot reload        |
| `npm run build`   | Build the static site into `dist/`          |
| `npm run preview` | Serve the built `dist/` locally to check it |
| `npm run check`   | Type-check `.astro` and `.tsx` files        |

---

## Editing content

Almost everything you'll want to change lives in **two places**.

### 1. `src/data/site.ts` — everything except case studies

One typed file holding your profile, metrics, experience, education, skills and navigation. Change it here and it updates everywhere on the site.

- **`profile`** — name, role, email, LinkedIn, GitHub, résumé path, availability line
- **`metrics`** — the four big numbers on the homepage
- **`experience`** — the timeline on `/experience/`. Add a job by adding an object to the array; newest goes first
- **`education`** — degree cards
- **`skillGroups`** — skills, grouped, each with a level: `3` = Expert, `2` = Proficient, `1` = Introduced
- **`aboutParagraphs`** — the About section on the homepage

> **Worth reviewing:** the skill levels were assigned from the emphasis in your résumé. They're claims a recruiter may ask you to back up, so read through them and adjust anything that doesn't match how you'd describe yourself in an interview.

### 2. `src/content/projects/*.mdx` — the case studies

**One file per project.** To add a project, copy an existing `.mdx` file and edit it. The frontmatter is validated at build time by the schema in `src/content.config.ts` — if you misspell a field or forget one, the build fails with a clear message rather than silently shipping a broken page.

```yaml
---
title: "Project name"
subtitle: "One line under the title"
order: 5 # sort order; lower shows first
summary: "Two sentences for the card and page header."
organization: "Where you did it"
period: "2024 — 2025"
tags: ["Mechanical Design", "GD&T"] # become filter chips on /projects
stack: ["SolidWorks", "ANSYS"] # sidebar list on the case-study page
metric:
  value: "8%" # the big number on the card
  label: "Cycle time improvement"
diagram: "pulley" # assembly | pulley | chamber | orbit
featured: true # show on the homepage
draft: false # true hides it everywhere
---
```

Everything below the frontmatter is normal Markdown and becomes the case-study body.

---

## Adding real images

The site currently uses **generated blueprint-style SVG diagrams** (`src/components/ProjectDiagram.astro`) in place of photography. They look deliberate rather than empty, but real CAD renders and prototype photos will always be stronger.

To swap one in:

1. Put the image in `public/assets/projects/`
2. In `src/components/ProjectCard.astro` and `src/pages/projects/[...slug].astro`, replace the `<ProjectDiagram ... />` element with an `<img>` (or Astro's `<Image>` component) pointing at your file

Keep the same aspect ratios — `16/10` on cards, `21/9` on the case-study header — so the layout doesn't shift.

**Before publishing any image from work, check it isn't proprietary.** Aerospace and defence CAD frequently is. Screenshots of personal projects, coursework, and anything you have written permission to share are safe; production drawings usually are not.

---

## Your portrait

**The portrait is optional.** With no photo present the About section simply omits it and the site builds and publishes normally — so you can go live now and add a photo whenever you have one.

To add it, drop the file in `src/assets/` named `portrait`, with any of these extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

```
src/assets/portrait.jpg
```

It appears on the next build with no code change. Astro handles the rest at build time — it generates responsive WebP variants at 400/640/900 px wide and serves the right one per device. No manual resizing or optimising needed.

**Framing.** The frame is 4:5 and the photo is cropped with `object-fit: cover`, so a tall source is fine. If the crop sits wrong, adjust one value in `src/components/Portrait.astro`:

```astro
focus = "50% 32%"   /* horizontal%, vertical% — lower the second number to move the crop up */
```

Or override per use: `<Portrait focus="50% 25%" />`.

**Treatment.** The image sits at 82% saturation at rest and returns to full colour on hover, which keeps a busy background from fighting the site's palette. To disable, delete the `filter` rules in that component's `<style>` block.

**Caption.** Defaults to your `profile.location` from `src/data/site.ts` ("Starkville, Mississippi"). Override it with `<Portrait caption="New York, NY" />`.

---

## Updating the résumé

Replace `public/assets/Guruvishnu_Nallamadugu_Resume.pdf` with the new file, keeping the same filename. The download links pick it up automatically.

---

## How it's put together

```
src/
├── data/site.ts              Single source of truth for site content
├── content.config.ts         Schema that validates project frontmatter
├── content/projects/         Case studies (.mdx)
├── layouts/BaseLayout.astro  <head>, SEO, JSON-LD, nav, footer, scroll reveal
├── components/
│   ├── Nav.astro             Sticky nav + mobile menu
│   ├── Footer.astro
│   ├── Section.astro         Reusable section header
│   ├── ProjectCard.astro
│   ├── ProjectDiagram.astro  Generated blueprint SVGs
│   ├── SkillMeter.astro      Three-segment proficiency meter
│   ├── WireframeAssembly.tsx React island — Three.js hero (desktop only)
│   └── OrbitSimulator.tsx    React island — interactive orbit solver
├── pages/                    One file per route
└── styles/global.css         Design tokens + component classes
```

### Performance notes

Astro ships **zero JavaScript by default** — pages are static HTML. Only two components hydrate:

- **`WireframeAssembly`** uses `client:media="(min-width: 1024px)"`, so phones never download the ~230 kB (gzipped) WebGL bundle. Everyone gets a server-rendered SVG first; desktop upgrades it to the animated version after mount.
- **`OrbitSimulator`** uses `client:visible` — it loads only once you scroll it into view.

Both respect `prefers-reduced-motion` and fall back to static renders.

### The orbit simulator

`src/components/OrbitSimulator.tsx` is a real two-body solver, not an animation:

- Canonical heliocentric units (AU, years), so `mu = 4π²`
- State vector from orbital elements, and elements recovered from the state vector via specific orbital energy and the eccentricity vector
- Kepler's equation solved by Newton–Raphson to propagate position
- Optimal single-burn ΔV computed from vis-viva at periapsis

Asteroid elements are real published values from the NASA JPL Small-Body Database. Simplifications for the browser: coplanar two-body dynamics, circular planetary orbits, impulsive burns.

---

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. The only manual step is a one-time setting:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

After that, pushing to `main` publishes the site.
