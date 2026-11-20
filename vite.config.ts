import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const websDir = resolve(import.meta.dirname, 'webs');
const slugs = readdirSync(websDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('_') && existsSync(resolve(websDir, d.name, 'index.html')))
  .map((d) => d.name);

const input: Record<string, string> = { gallery: resolve(import.meta.dirname, 'index.html') };
for (const slug of slugs) input[slug] = resolve(websDir, slug, 'index.html');

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      input,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three';
          // Rapier (only Funnyschool) imports its WASM with import(): kept out of r3f so the bundler
          // does not host Vite's __vitePreload helper there and pull the 3D stack into every first paint.
          if (id.includes('@react-three/rapier') || id.includes('@dimforge')) return undefined;
          if (id.includes('@react-three')) return 'r3f';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'scroll';
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion';
          return undefined;
        },
      },
    },
  },
});
