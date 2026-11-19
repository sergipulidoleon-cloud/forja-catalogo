// node scripts/hdri.mjs <polyhaven_name> <out.hdr> [width=256]
// Downloads a Poly Haven HDRI (CC0, 1k) and box-downsamples it to a small RGBE .hdr used only
// for image-based lighting. Small enough (~130 KB) to fit the mobile 3D budget.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [name, out, w = '256'] = process.argv.slice(2);
const files = await (await fetch(`https://api.polyhaven.com/files/${name}`)).json();
const url = files.hdri['1k'].hdr.url;
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());

// --- parse Radiance RGBE (adaptive RLE) ---
let p = 0;
const line = () => {
  let s = '';
  while (buf[p] !== 0x0a) s += String.fromCharCode(buf[p++]);
  p++;
  return s;
};
let l;
while ((l = line()) !== '') {}
const res = line().split(' ');
const H = +res[1];
const W = +res[3];
const data = new Float32Array(W * H * 3);
const scan = new Uint8Array(W * 4);
for (let y = 0; y < H; y++) {
  if (buf[p] === 2 && buf[p + 1] === 2) {
    p += 4;
    for (let c = 0; c < 4; c++) {
      let x = 0;
      while (x < W) {
        let n = buf[p++];
        if (n > 128) {
          n -= 128;
          const v = buf[p++];
          for (let i = 0; i < n; i++) scan[(x++) * 4 + c] = v;
        } else for (let i = 0; i < n; i++) scan[(x++) * 4 + c] = buf[p++];
      }
    }
  } else {
    for (let x = 0; x < W; x++) for (let c = 0; c < 4; c++) scan[x * 4 + c] = buf[p++];
  }
  for (let x = 0; x < W; x++) {
    const e = scan[x * 4 + 3];
    const f = e ? Math.pow(2, e - 136) : 0;
    const i = (y * W + x) * 3;
    data[i] = scan[x * 4] * f;
    data[i + 1] = scan[x * 4 + 1] * f;
    data[i + 2] = scan[x * 4 + 2] * f;
  }
}

// --- box downsample ---
const OW = +w;
const OH = Math.round((OW * H) / W);
const sx = W / OW;
const sy = H / OH;
const outBuf = [Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\nSOURCE=polyhaven.com/a/${name} (CC0)\n\n-Y ${OH} +X ${OW}\n`, 'ascii')];
const px = Buffer.alloc(OW * OH * 4);
for (let y = 0; y < OH; y++)
  for (let x = 0; x < OW; x++) {
    let r = 0,
      g = 0,
      b = 0,
      n = 0;
    for (let yy = Math.floor(y * sy); yy < Math.floor((y + 1) * sy); yy++)
      for (let xx = Math.floor(x * sx); xx < Math.floor((x + 1) * sx); xx++) {
        const i = (yy * W + xx) * 3;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n++;
      }
    r /= n;
    g /= n;
    b /= n;
    const m = Math.max(r, g, b);
    const o = (y * OW + x) * 4;
    if (m < 1e-32) continue;
    const e = Math.ceil(Math.log2(m));
    const k = 256 / Math.pow(2, e);
    px[o] = Math.min(255, Math.floor(r * k));
    px[o + 1] = Math.min(255, Math.floor(g * k));
    px[o + 2] = Math.min(255, Math.floor(b * k));
    px[o + 3] = e + 128;
  }
outBuf.push(px);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.concat(outBuf));
console.log(`${name}: ${W}x${H} -> ${OW}x${OH}, ${(Buffer.concat(outBuf).length / 1024).toFixed(0)} KB`);
