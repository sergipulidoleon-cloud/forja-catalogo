// node scripts/model.mjs <source> <outDir> [--tris 60000] [--mobile-tris 25000]
//   source = polyhaven:<asset_name> | sketchfab:<uid> | file:<path/to/model.gltf|glb>
// Produces <outDir>/model.glb (desktop: 2K KTX2 textures) and <outDir>/model-mobile.glb (1K),
// both Meshopt-compressed, and prints their weight. Run with NODE_USE_ENV_PROXY=1.
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, resample, textureCompress, meshopt, center } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import { mkdirSync, writeFileSync, statSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { ktx2 } from 'ktx2-encoder/gltf-transform';

const args = process.argv.slice(2);
const [source, outDir] = args;
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i > -1 ? Number(args[i + 1]) : d;
};
const TRIS = opt('--tris', 60000);
const MOBILE_TRIS = opt('--mobile-tris', 25000);
const TMP = resolve(process.env.TMPDIR ?? '/tmp', 'forja-models', basename(outDir));
mkdirSync(TMP, { recursive: true });
mkdirSync(outDir, { recursive: true });

async function download(url, to) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, Buffer.from(await r.arrayBuffer()));
}

async function fetchSource() {
  const [kind, id] = source.split(/:(.+)/);
  if (kind === 'file') return resolve(id);
  if (kind === 'polyhaven') {
    const files = await (await fetch(`https://api.polyhaven.com/files/${id}`)).json();
    const res = files.gltf['2k'] ?? files.gltf['1k'];
    const g = res.gltf;
    const main = join(TMP, basename(new URL(g.url).pathname));
    await download(g.url, main);
    for (const [rel, inc] of Object.entries(g.include ?? {})) await download(inc.url, join(TMP, rel));
    return main;
  }
  if (kind === 'sketchfab') {
    const d = await (await fetch(`https://api.sketchfab.com/v3/models/${id}/download`)).json();
    if (!d.gltf) throw new Error('Sketchfab download failed: ' + JSON.stringify(d).slice(0, 200));
    const zip = join(TMP, 'model.zip');
    await download(d.gltf.url, zip);
    execFileSync('unzip', ['-o', '-q', zip, '-d', TMP]);
    const find = (dir) => {
      for (const f of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, f.name);
        if (f.isDirectory()) {
          const r = find(p);
          if (r) return r;
        } else if (f.name === 'scene.gltf' || f.name.endsWith('.glb')) return p;
      }
    };
    return find(TMP);
  }
  throw new Error('unknown source ' + source);
}

const imageDecoder = async (buf) => {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { width: info.width, height: info.height, data: new Uint8Array(data) };
};

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });

const input = await fetchSource();
const countTris = (doc) => {
  let t = 0;
  for (const m of doc.getRoot().listMeshes())
    for (const p of m.listPrimitives()) {
      const idx = p.getIndices();
      t += idx ? idx.getCount() / 3 : p.getAttribute('POSITION').getCount() / 3;
    }
  return Math.round(t);
};

async function build(variant, tris, size) {
  const doc = await io.read(input);
  const before = countTris(doc);
  const ratio = Math.min(1, tris / Math.max(1, before));
  await doc.transform(
    dedup(),
    prune(),
    resample(),
    weld({}),
    ...(ratio < 1 ? [simplify({ simplifier: MeshoptSimplifier, ratio, error: 0.0008, lockBorder: false })] : []),
    center({ pivot: 'center' }),
    // Resize first (lossless PNG), then GPU-compressed KTX2: UASTC for normal maps, ETC1S for the rest.
    textureCompress({ encoder: sharp, targetFormat: 'png', resize: [size, size] }),
    ktx2({ imageDecoder, slots: /normal/i, isUASTC: true, isNormalMap: true, generateMipmap: true, needSupercompression: true, uastcLDRQualityLevel: 1, enableRDO: true, rdoQualityLevel: 3 }),
    ktx2({ imageDecoder, slots: /^(?!.*normal).*$/i, isUASTC: false, qualityLevel: 200, compressionLevel: 2, generateMipmap: true, isPerceptual: true }),
    meshopt({ encoder: MeshoptEncoder, level: 'medium' }),
    prune(),
  );
  const out = join(outDir, variant === 'desktop' ? 'model.glb' : 'model-mobile.glb');
  await io.write(out, doc);
  return { out, before, after: countTris(doc), kb: Math.round(statSync(out).size / 1024) };
}

const desk = await build('desktop', TRIS, 2048);
const mob = await build('mobile', MOBILE_TRIS, 1024);
console.log(JSON.stringify({ source, desktop: desk, mobile: mob }, null, 1));
