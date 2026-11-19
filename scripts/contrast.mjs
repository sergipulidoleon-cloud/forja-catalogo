import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
for (const slug of process.argv.slice(2)) {
  const chrome = await chromeLauncher.launch({ chromePath: '/opt/pw-browsers/chromium-1243/chrome-linux64/chrome', chromeFlags: ['--headless=new', '--no-sandbox'] });
  const r = await lighthouse(`http://localhost:4173/webs/${slug}/`, { port: chrome.port, onlyAudits: ['color-contrast'], logLevel: 'error' });
  const items = r.lhr.audits['color-contrast'].details?.items ?? [];
  console.log('==', slug);
  for (const it of items) console.log(' ', it.node.selector, '|', (it.node.explanation || '').split('\n').slice(1, 2).join(' ').slice(0, 160));
  await chrome.kill();
}
