// node scripts/new-site.mjs <slug> "<Nombre>" "<#theme>" "<fontImport1,fontImport2>" "<favicon svg inner>"
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
const [slug, name, theme, fonts, icon] = process.argv.slice(2);
const dir = resolve(import.meta.dirname, '..', 'webs', slug);
mkdirSync(dir, { recursive: true });
const fav = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>${icon}</svg>`).replace(/'/g, '%27');
writeFileSync(
  resolve(dir, 'index.html'),
  `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${name} · Propuesta de diseño (demo no oficial)</title>
    <meta name="description" content="Propuesta de diseño — demo no oficial. Concepto de web para ${name}, L'Hospitalet de Llobregat. No es la web oficial del negocio." />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta name="googlebot" content="noindex, nofollow" />
    <meta name="demo-notice" content="Propuesta de diseño — demo no oficial" />
    <meta name="theme-color" content="${theme}" />
    <link rel="icon" href="data:image/svg+xml,${fav}" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>Propuesta de diseño — demo no oficial. Activa JavaScript para ver la demo.</noscript>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>
`,
);
writeFileSync(
  resolve(dir, 'main.tsx'),
  `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
${fonts
  .split(',')
  .filter(Boolean)
  .map((f) => `import '${f.trim()}';`)
  .join('\n')}
import '../_kit/kit.css';
import './styles.css';
import App from './App';
import { LangProvider } from './content';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
);
`,
);
console.log('scaffolded', slug);
