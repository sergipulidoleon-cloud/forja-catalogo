# 3D fotorrealista: webs 1–3

Comparativas en esta carpeta: `<slug>-antes-despues.webp` (antes · después escritorio · después móvil), y `<slug>-despues-escritorio.webp` / `<slug>-despues-movil.webp` por separado.

| Negocio | Modelo | Licencia | Peso 3D escritorio | Peso 3D móvil | FPS | Nota «¿parece una foto?» |
|---|---|---|---|---|---|---|
| Clínica Dental Bellvitge | Molar inferior escaneado (University of Dundee, School of Dentistry) | CC BY 4.0 (atribución en el pie) | 1,20 MB | 0,93 MB | sin medir (ver abajo) | 8/10 |
| Cal Síscu | Bogavante (Ant Gregory) | CC BY 4.0 (atribución en el pie) | 3,41 MB | 2,06 MB | sin medir | 8/10 |
| El Racó del Cargol | Caracol (Jungle Jim) | CC BY 4.0 (atribución en el pie) | 1,95 MB | 1,19 MB | sin medir | 7,5/10 |

- El peso 3D incluye el modelo (Meshopt + KTX2), el HDRI de Poly Haven (CC0), el mapa de imperfecciones de ambientCG (CC0) y el transcodificador Basis (0,58 MB, que se comparte entre webs y queda en caché). Todo cabe en el límite de 5 MB en escritorio y 2,5 MB en móvil.
- El JavaScript de three.js y R3F (418 KB gzip) se carga aparte y solo cuando el visitante interactúa por primera vez. Hasta entonces se ve el póster AVIF (15–36 KB).
- Con `prefers-reduced-motion` o sin WebGL se queda el póster AVIF estático.
- **Lighthouse en móvil:** Dental 95/100, Cal Síscu 96/100, Racó 97/100 (rendimiento/accesibilidad).
- **FPS:** el contenedor donde trabajo no tiene GPU y el renderizado por software da 1–4 fps, que no dice nada de un equipo real. Para medirlo, abre cada web con `?fps` al final de la URL en tu portátil y en tu móvil: aparece un contador arriba a la izquierda. Si baja de 50 fps, la web desactiva sola el postprocesado caro y reduce la resolución.
- **Racó del Cargol (7,5):** la concha convence, pero el cuerpo del escaneo sigue algo brillante y «de bronce». Tras tres ajustes de material es lo máximo que da este modelo. Si se busca un 9, la vía es un caracol escaneado en el propio restaurante (ver `docs/guia-gaussian-splatting.md`) o un modelo de fotogrametría de pago.
