# Forja: 20 webs demo para negocios de L'Hospitalet

Propuestas de diseño (demos no oficiales) para 20 negocios locales, más el estudio de mercado y los emails de captación.

| Qué | Dónde |
|---|---|
| Estudio de mercado (Fase 1) | `estudio-mercado.md` |
| Candidatos, URLs, Lighthouse y estado de cada email | `negocios.csv` |
| Las 20 demos (Fase 2) | `webs/<slug>/` |
| Galería con las 20 | `index.html` |
| Dirección de arte de cada demo | `webs/DIRECCION-DE-ARTE.md` |
| Capturas de escritorio y móvil | `capturas/` |
| Informes de Lighthouse (móvil) | `lighthouse/` |
| Emails de captación (Fase 3) | `emails/emails.json` |

## Arrancar en local

```bash
npm install
npm run dev          # desarrollo: http://localhost:5173/ y /webs/<slug>/
npm run build        # comprueba tipos y genera dist/
npm run preview      # sirve dist/ en http://localhost:4173/
```

## Stack

Vite y React con TypeScript. Para el 3D, Three.js con React Three Fiber y drei. Para el scroll, GSAP con ScrollTrigger y Lenis. Las microinteracciones van con Motion (Framer Motion).

Las 20 demos comparten solo la infraestructura invisible, que está en `webs/_kit`:
- textos en castellano y catalán;
- aviso de demo no oficial y `noindex`;
- cursor propio y scroll suave;
- `prefers-reduced-motion`;
- 3D diferido con póster y fallback sin WebGL;
- mapa que se carga al pulsar y toasts de demo.

Cada demo tiene su propia composición, tipografía, paleta, objeto 3D y movimiento.

## Rendimiento

El hero 3D sigue el patrón *facade* que recomienda Lighthouse:
1. Primero se pinta un póster, que es un render de la propia escena.
2. Three.js se carga con la primera interacción (ratón, scroll, toque o teclado).
3. En equipos sin GPU (WebGL por software) se queda el póster.

Para regenerar pósters y capturas:

```bash
npm run build && npm run preview &
node scripts/shoot.mjs poster <slug>   # renderiza webs/<slug>/poster.webp
node scripts/shoot.mjs shots <slug>    # capturas/<slug>-escritorio.png y -movil.png
node scripts/lh.mjs <slug>             # Lighthouse móvil a lighthouse/
```

## Desplegar

El proyecto es un único build estático con las 20 demos en `/webs/<slug>/`.

```bash
npm run build
npx vercel deploy dist --yes     # o: npx netlify deploy --dir dist
```

## Contenido

- No se ha inventado ningún dato de los negocios.
- Los horarios, teléfonos y textos que no publica el propio negocio están marcados como «por confirmar» o «de ejemplo».
- Las reseñas son siempre «Reseña de ejemplo».
- Las fotos son placeholders ilustrados («Espacio para foto real»).
- Los botones de WhatsApp, llamada y reserva muestran un aviso de demo y no contactan con el negocio.
