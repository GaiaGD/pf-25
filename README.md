# Gaia DG Portfolio

Portfolio site of Gaia Di Gregorio, front-end engineer.

**Live:** [gaiadg.dev](https://gaiadg.dev)

## What it demonstrates

A single-page portfolio built with the Next.js App Router and TypeScript. Server components render the page shell and content, and small client components handle the interactive parts (sliders, the WebGL background, text animations). The case studies live on the site itself, so this repo is just the code behind it.

## Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Sass modules (`*.module.scss`) with shared variables, breakpoints and mixins in `src/app/styles/abstracts`
- **Animation:** Framer Motion (text and cards), Embla (vertical scroller), Swiper (work slider), plus `ogl` and `three` for the WebGL backgrounds
- **Fonts:** IBM Plex Sans and Rubik, loaded through `next/font/google`
- **Analytics:** Google Analytics via `next/script`

## Decisions

- **Work content lives in `works.json`.** Adding or editing a project is a data change, not a component change, and the NDA projects share the same shape as the others.
- **Images go through `next/image`** with a `sizes` hint, so each viewport gets an appropriately sized file.
- **Fonts are self-hosted at build time** by `next/font`, which avoids a render-blocking request to Google Fonts.
- **`/work` permanently redirects to `/`** because the work slider is part of the home page.

## Accessibility and performance

- Slider and navigation controls have `aria-label`s, Swiper's keyboard and A11y modules are enabled, and images have alt text. The page declares `lang="en"`.
- Routes are prerendered as static content at build time.
- I haven't audited either area in full. Treat this list as what's in the code, not a compliance claim.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Contact

- Email: [hi.gaiadg@gmail.com](mailto:hi.gaiadg@gmail.com)
- LinkedIn: [linkedin.com/in/gaiadg](https://www.linkedin.com/in/gaiadg/)
- GitHub: [github.com/GaiaGD](https://github.com/GaiaGD)
