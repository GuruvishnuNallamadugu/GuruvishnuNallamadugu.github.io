/**
 * Rasterises public/assets/og-image.svg to a PNG.
 *
 * Social platforms (LinkedIn, Twitter/X, Slack, iMessage) do not render SVG
 * link previews — they need a raster image. The SVG stays the editable source;
 * this produces the file the meta tags actually point at.
 *
 * Run after editing the SVG:  npm run og
 */
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public/assets/og-image.svg");
const out = join(root, "public/assets/og-image.png");

const svg = await readFile(src);

// density 2x the nominal 96dpi renders the 1200x630 viewBox at 2400x1260,
// which is then downsampled — noticeably crisper text than a 1x render.
const png = await sharp(svg, { density: 192 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(out, png);

const { width, height } = await sharp(png).metadata();
console.log(
  `og-image.png  ${width}x${height}  ${(png.length / 1024).toFixed(1)} kB`,
);
