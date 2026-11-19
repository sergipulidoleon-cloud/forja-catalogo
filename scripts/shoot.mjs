// Usage: node scripts/shoot.mjs <mode> [slug...]
//   mode = poster | shots | all
// Expects `vite preview` running on http://localhost:4173.
// poster: renders the live hero scene and saves webs/<slug>/poster.avif (alpha) for the no-WebGL fallback and first paint.
// shots:  desktop (1440x900) and mobile (390x844) full-page screenshots into capturas/.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const BASE = process.env.BASE_URL ?? 'http://localhost:4173';
const [mode = 'all', ...only] = process.argv.slice(2);
const slugs = (only.length ? only : readdirSync(resolve(ROOT, 'webs'), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name)).filter((s) =>
  existsSync(resolve(ROOT, 'webs', s, 'index.html')),
);
mkdirSync(resolve(ROOT, 'capturas'), { recursive: true });

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });

async function waitScene(page) {
  await page.mouse.move(700, 420);
  await page.mouse.move(760, 380, { steps: 4 });
  await page.waitForSelector('.kit-scene[data-ready]', { timeout: 60000 });
}

for (const slug of slugs) {
  const url = `${BASE}/webs/${slug}/?force3d`;
  if (mode === 'poster' || mode === 'all') {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    try {
      await waitScene(page);
      await page.mouse.move(720, 450, { steps: 8 });
      await page.waitForTimeout(3200);
      // Only the canvas may show: page text over the hero would otherwise be baked into the poster.
      await page.addStyleTag({ content: '*:not(canvas){background:transparent!important;box-shadow:none!important}html,body{background:transparent!important}body *{visibility:hidden!important}.kit-scene__canvas,.kit-scene__canvas *{visibility:visible!important}.kit-scene__poster,.kit-cursor,.kit-demo-tag,.kit-scene__motion{display:none!important}' });
      await page.waitForTimeout(100);
      const canvas = await page.$('.kit-scene__canvas canvas');
      const png = await canvas.screenshot({ omitBackground: true });
      await sharp(png).avif({ quality: 62, effort: 6 }).toFile(resolve(ROOT, 'webs', slug, 'poster.avif'));
      console.log(`poster ok  ${slug}`);
    } catch (e) {
      console.log(`poster FAIL ${slug}: ${e.message.split('\n')[0]}`);
    }
    await ctx.close();
  }
  if (mode === 'shots' || mode === 'all') {
    for (const [name, opts] of [
      ['escritorio', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
      ['movil', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
    ]) {
      // Full-page captures use reduced motion: scroll scenes show their settled state and the 3D renders still.
      const ctx = await browser.newContext({ ...opts, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      try {
        if (name === 'movil') await page.touchscreen.tap(5, 5).catch(() => {});
        else await waitScene(page);
        await page.waitForTimeout(2500);
      } catch {
        /* screenshot whatever rendered */
      }
      await page.screenshot({ path: resolve(ROOT, 'capturas', `${slug}-${name}.png`), fullPage: true });
      console.log(`shot ok    ${slug}-${name}`);
      await ctx.close();
    }
  }
}
await browser.close();
