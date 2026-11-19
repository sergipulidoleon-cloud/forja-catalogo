// node scripts/lab-shot.mjs <url> <out.png> [w h dpr] : waits for body[data-ready] or .kit-scene[data-ready], measures fps, screenshots.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const [url, out, w = '1440', h = '900', dpr = '1'] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
const logs = [];
p.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && logs.push(m.text().slice(0, 200)));
p.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message.slice(0, 200)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.mouse.move(+w / 2, +h / 2);
await p.mouse.move(+w * 0.6, +h * 0.45, { steps: 6 });
try {
  await p.waitForFunction(() => document.body.dataset.ready || document.querySelector('.kit-scene[data-ready]'), null, { timeout: 120000 });
} catch {
  logs.push('TIMEOUT waiting for ready');
}
await p.waitForTimeout(6000);
const fps = await p.evaluate(() => window.__fps);
await p.screenshot({ path: out });
console.log(JSON.stringify({ fps_swiftshader: fps, logs: [...new Set(logs)].slice(0, 8) }));
await b.close();
