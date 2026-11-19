// Usage: NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt node scripts/deploy-vercel.mjs [project-name]
// Uploads dist/ to Vercel as a static deployment (production target of a dedicated project, so the
// links are public) and prints the base URL. The token is injected by the session's network proxy.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST = resolve(ROOT, 'dist');
const NAME = process.argv[2] ?? 'demos-hospitalet';
const API = 'https://api.vercel.com';
const auth = { Authorization: 'Bearer proxy-injected' };

// Demo pages must never be indexed: header on top of the meta tag.
writeFileSync(
  join(DIST, 'vercel.json'),
  JSON.stringify({ headers: [{ source: '/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }] }, null, 2),
);

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST).map((p) => {
  const data = readFileSync(p);
  return { file: relative(DIST, p).split('\\').join('/'), sha: createHash('sha1').update(data).digest('hex'), size: data.length, data };
});

async function upload(f, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const r = await fetch(`${API}/v2/files`, {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/octet-stream', 'x-vercel-digest': f.sha, 'Content-Length': String(f.size) },
      body: f.data,
    });
    if (r.ok) return;
    if (i === tries - 1) throw new Error(`upload ${f.file}: ${r.status} ${await r.text()}`);
    await new Promise((s) => setTimeout(s, 1000 * 2 ** i));
  }
}

let i = 0;
const queue = [...files];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const f = queue.shift();
      await upload(f);
      if (++i % 50 === 0) console.log(`uploaded ${i}/${files.length}`);
    }
  }),
);
console.log(`uploaded ${files.length} files`);

const r = await fetch(`${API}/v13/deployments?skipAutoDetectionConfirmation=1`, {
  method: 'POST',
  headers: { ...auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: NAME,
    project: NAME,
    target: 'production',
    files: files.map(({ file, sha, size }) => ({ file, sha, size })),
    projectSettings: { framework: null, buildCommand: null, installCommand: null, outputDirectory: null },
  }),
});
const dep = await r.json();
if (!r.ok) {
  console.error(JSON.stringify(dep));
  process.exit(1);
}
console.log(JSON.stringify({ id: dep.id, url: dep.url, alias: dep.alias, readyState: dep.readyState }));
