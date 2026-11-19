// node scripts/crops.mjs <slug> <outDir>: splits the full-page captures into viewable pieces.
import sharp from 'sharp';
import { resolve } from 'node:path';
const [slug, out] = process.argv.slice(2);
const ROOT = resolve(import.meta.dirname, '..');
for (const [name, w, chunk] of [['escritorio', 1000, 2600], ['movil', 390, 3400]]) {
  const file = resolve(ROOT, 'capturas', `${slug}-${name}.png`);
  const meta = await sharp(file).metadata();
  const scale = w / meta.width;
  const resized = await sharp(file).resize(w).toBuffer();
  const h = Math.round(meta.height * scale);
  let i = 0;
  for (let top = 0; top < h; top += chunk) {
    await sharp(resized).extract({ left: 0, top, width: w, height: Math.min(chunk, h - top) }).toFile(resolve(out, `${slug}-${name}-${i++}.png`));
  }
  console.log(name, i, 'parts');
}
