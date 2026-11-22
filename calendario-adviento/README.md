# Calendario de Adviento 3D 🎄🐱

Una sola página (`index.html`) con Three.js. Está pensada para abrirla en el móvil.

## 1. Personalízalo
Abre `index.html` con cualquier editor. Todo el contenido está en el objeto `CONFIG`, al principio del archivo. Busca los `✏️`.

| Qué | Dónde |
|---|---|
| Fotos (polaroid) | Carpeta `fotos/` → `foto1.jpg`, `foto2.jpg`… (o cambia los nombres en `CONFIG`) |
| Imágenes/GIFs de Stitch | Carpeta `stitch/` → `stitch1.gif`, `stitch2.gif`, `stitch3.gif` |
| Canción del día 24 | Carpeta `musica/` → `nuestra-cancion.mp3` (opcional) |
| Canciones | Pega el enlace de Spotify o YouTube en `spotify:` / `youtube:` |
| Mapa | Cambia `lat` / `lng` (en Google Maps, mantén pulsado un sitio y copia los números) |
| Quiz | `correcta: 0` = la primera opción, `1` = la segunda… |

Usa fotos `.jpg` de menos de 1 MB para que cargue rápido. Puedes reducirlas en squoosh.app.

## 2. Pruébalo
- Para que funcionen el mapa y la música, ábrelo desde una web (Netlify o GitHub Pages) o con un servidor local: `python3 -m http.server` y luego `http://localhost:8000`.
- **Modo prueba:** toca 5 veces seguidas el título de arriba. Se abren todos los días y no se guarda nada. Con el botón "Borrar progreso" se borra lo guardado en ese móvil.
- **Antes de mandárselo:** desactiva el modo prueba (otros 5 toques) o simplemente recarga la página. Si abriste cajas sin el modo prueba, se quedan guardadas en tu móvil, no en el suyo.

## 3. Súbelo gratis

### Opción A: Netlify Drop (la más fácil, 2 minutos)
1. Entra en https://app.netlify.com/drop
2. Arrastra **la carpeta `calendario-adviento` entera** (con `index.html`, `fotos`, `stitch` y `musica`).
3. Te da un enlace del tipo `https://nombre-raro.netlify.app`. Crea una cuenta gratis para que no caduque. Desde *Site configuration → Change site name* puedes ponerle un nombre bonito, por ejemplo `adviento-nadia`.
4. Para actualizarla: *Deploys* → arrastra otra vez la carpeta.

### Opción B: GitHub Pages
1. Crea un repositorio público en GitHub, por ejemplo `adviento`.
2. *Add file → Upload files* → sube el **contenido** de la carpeta (`index.html` y las carpetas) → *Commit*.
3. *Settings → Pages* → *Source: Deploy from a branch* → rama `main`, carpeta `/ (root)` → *Save*.
4. En 1 o 2 minutos estará en `https://TU-USUARIO.github.io/adviento/`.

> Ojo: en GitHub Pages el repositorio público deja ver las fotos y los textos a quien tenga el enlace. Si prefieres más privacidad, usa Netlify.

## 4. Mándale el enlace 💌
- Que lo abra en Safari o Chrome. En el iPhone, *Compartir → Añadir a pantalla de inicio* para tenerlo como una app.
- Que lo abra siempre desde el mismo navegador y el mismo móvil, porque su progreso se guarda ahí.
- En el iPhone, si no suena nada, que quite el modo silencio.
