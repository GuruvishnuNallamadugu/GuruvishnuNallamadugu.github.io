# Portrait

Drop your photo in this folder named `portrait` — any of `.jpg`, `.jpeg`,
`.png`, `.webp` or `.avif` works:

    src/assets/portrait.jpg

It appears automatically in the About section on the next build. Astro
generates responsive WebP variants (400/640/900 px wide) at build time, so
there is no need to resize or compress it first. A tall or square source is
fine — the frame is 4:5 and crops with `object-fit: cover`.

If the crop sits wrong, adjust `focus` in `src/components/Portrait.astro`.

Until a file is present the About section simply omits the portrait — the
site builds and publishes cleanly with no photo.
