# 3D fotorrealista en las 20 webs demo

En esta carpeta, por web: `<slug>-antes-despues.webp` (antes · después escritorio · después móvil) y las capturas sueltas `<slug>-despues-escritorio.webp` / `<slug>-despues-movil.webp`.

| # | Negocio | Modelo 3D | Licencia | Peso 3D escritorio / móvil | Nota «¿parece una foto?» |
|---|---|---|---|---|---|
| 1 | Clínica Dental Bellvitge | Molar inferior escaneado (University of Dundee) | CC BY 4.0 | 1,14 / 0,89 MB | 8 |
| 2 | Cal Síscu | Bogavante (Ant Gregory) | CC BY 4.0 | 3,29 / 2,00 MB | 8 |
| 3 | El Racó del Cargol | Caracol (Jungle Jim) | CC BY 4.0 | 1,85 / 1,14 MB | 7,5 |
| 4 | La Cocina de Graciela | Aguacate escaneado (Poly Haven) | CC0 | 3,57 / 1,60 MB | 8 |
| 5 | Barber Shop Hospitalet | Sillón de barbero (Poly Haven) | CC0 | 3,37 / 2,04 MB | 8 |
| 6 | Casa Varela 1986 | Arroz negro en paella, fotogrametría (Emm) | CC BY 4.0 | 1,86 / 1,21 MB | 8 |
| 7 | Clínica Dental P&P | Dentadura permanente escaneada (University of Dundee) | CC BY 4.0 | 2,73 / 1,82 MB | 8 |
| 8 | Funnyschool | Cubos de letras de madera (Cherryvania), con física Rapier | CC BY 4.0 | 4,12 / 1,80 MB | 8 |
| 9 | Hospitalet Dental | Implante dental en espiral (MSDI) | CC BY 4.0 | 1,36 / 1,09 MB | 8 |
| 10 | Debut | Pastel de chocolate en plato antiguo, fotogrametría (alban) | CC BY 4.0 | 1,60 / 1,07 MB | 8 |
| 11 | Mar Azul | Limas escaneadas (Poly Haven) | CC0 | 3,71 / 1,58 MB | 8 |
| 12 | J Jowel Barber Studio | Navaja de barbero (OVROO) | CC BY 4.0 | 3,88 / 1,71 MB | 8,5 |
| 13 | Centre Veterinari Santa Eulàlia | Golden retriever (iRahulRajput) | CC BY 4.0 | 4,32 / 2,41 MB | 7 |
| 14 | Buda Tattoo | Máquina de bobinas de acero de Damasco (BartVanHoye) | CC BY 4.0 | 4,76 / 1,94 MB | 8,5 |
| 15 | FISAL Fisioterapia | Vértebra lumbar (Ualde) | CC BY 4.0 | 1,50 / 1,29 MB | 8 |
| 16 | English Of Course! | Globo terráqueo antiguo (Matthew Collings) | CC BY 4.0 | 4,87 / 1,93 MB | 8,5 |
| 17 | Autoescuela Sunyé | Cono de tráfico, fotogrametría (MrScanMan) | CC BY 4.0 | 2,82 / 1,29 MB | 9 |
| 18 | Talleres Ronda | Llave inglesa (Poly Haven) | CC0 | 3,53 / 2,03 MB | 8,5 |
| 19 | l'Essència Yoga & Pilates | Cuenco tibetano escaneado (JFN) | CC BY 4.0 | 2,00 / 1,60 MB | 8,5 |
| 20 | Ben Fi | Frasco de sérum con cuentagotas (ProductViz) | CC BY 4.0 | 1,14 / 0,93 MB | 8 |

- **Licencias:** todo es CC0 o CC BY 4.0. Las CC BY llevan la atribución en el pie de cada web, y cada web tiene su `assets/CREDITOS.md` con modelo, HDRI (Poly Haven, CC0) y mapa de imperfecciones (ambientCG, CC0). No he usado ningún modelo sin licencia clara.
- **Peso 3D:** incluye el modelo (Meshopt + KTX2), el HDRI, el mapa de imperfecciones y el transcodificador Basis (0,58 MB, compartido entre webs y en caché). Todas cumplen el límite de 5 MB en escritorio y 2,5 MB en móvil. El JavaScript de three.js se carga aparte y solo tras la primera interacción. Antes se ve un póster AVIF de 10–40 KB.
- **Movimiento reducido y sin WebGL:** se queda el póster AVIF estático.
- **Lighthouse (móvil, con el 3D nuevo):** rendimiento 92–97 y accesibilidad 100 en las 20 webs. LCP entre 2,4 y 3,3 s.
- **FPS:** no se pueden medir aquí porque el contenedor no tiene GPU. En un equipo real, añade `?fps` a la URL y aparece un contador. Por debajo de 50 fps la web quita sola el postprocesado caro y baja la resolución.
- **Por debajo de 8:**
  - **Veterinari (7):** el pelo del golden retriever es geometría, no pelo real, y de cerca se nota. Probé otro perro escaneado, más realista, pero estaba tumbado de lado y en una web de veterinario parecía un animal enfermo, así que lo descarté. La mejora real sería un escaneo de un paciente del propio centro, con permiso (guía en `docs/guia-gaussian-splatting.md`).
  - **Racó del Cargol (7,5):** el cuerpo del caracol sigue algo brillante.
