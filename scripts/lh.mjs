// Usage: node scripts/lh.mjs [slug...]  -> lighthouse/<slug>.json + summary table (mobile, default throttling)
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const only = process.argv.slice(2);
const slugs = (only.length ? only : readdirSync(resolve(ROOT, 'webs'), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name)).filter((s) => existsSync(resolve(ROOT, 'webs', s, 'index.html')));
mkdirSync(resolve(ROOT, 'lighthouse'), { recursive: true });
const summaryPath = resolve(ROOT, 'lighthouse', 'resumen.json');
const summary = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, 'utf8')) : {};

for (const slug of slugs) {
  const chrome = await chromeLauncher.launch({ chromePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
  try {
    const res = await lighthouse(`${BASE}/webs/${slug}/`, { port: chrome.port, output: 'json', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], logLevel: 'error' });
    const lhr = res.lhr;
    const s = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
    const m = lhr.audits;
    s.lcp = m['largest-contentful-paint'].displayValue;
    s.tbt = m['total-blocking-time'].displayValue;
    s.cls = m['cumulative-layout-shift'].displayValue;
    summary[slug] = s;
    writeFileSync(resolve(ROOT, 'lighthouse', `${slug}.json`), JSON.stringify({ categories: s, failing: Object.values(m).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable').map((a) => `${a.id}: ${a.displayValue ?? a.score}`) }, null, 2));
    console.log(slug.padEnd(36), JSON.stringify(s));
  } catch (e) {
    console.log(slug, 'FAIL', e.message);
  } finally {
    await chrome.kill();
  }
}
writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
