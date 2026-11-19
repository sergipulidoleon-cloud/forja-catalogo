# Guía rápida: escanear un local o un producto para Gaussian Splatting

Opción premium para las webs demo. Tú escaneas con el móvil y yo lo integro en la web con un visor de splats ([Spark](https://sparkjs.dev), ya preparado en `webs/_kit/splat.tsx`).

## Antes de escanear

- **Permiso por escrito del dueño**, aunque sea un WhatsApp: «Te doy permiso para escanear el local o el producto y usarlo en una propuesta de web».
- Que no salgan personas ni datos personales: caras, pantallas con datos, facturas, matrículas.
- Hazlo en **horas valle**, con el local vacío o casi.

## Qué app usar

| App | Para qué va mejor | Exportar |
|---|---|---|
| **Scaniverse** (gratis, iOS y Android) | Productos y rincones pequeños | `.spz` o `.ply` |
| **Polycam** | Locales completos y productos | Gaussian Splat → `.ply` |
| **Luma AI** | Escenas grandes con mucha luz | `.ply` (Gaussian Splat) |

Prefiero `.spz`: es el formato comprimido y pesa unas 10 veces menos que `.ply`.

## Cómo escanear para que salga bien

1. **Luz suave y constante.** Nada de sol directo ni luces que parpadean. Enciende todas las luces del local y no las cambies durante el escaneo.
2. **Bloquea la exposición** si la app te deja. Si no, evita apuntar a ventanas o a focos.
3. **Muévete despacio**, como si grabaras un vídeo a cámara lenta. Lo que lo estropea son los movimientos bruscos.
4. **Tres alturas:**
   - una vuelta a la altura del pecho;
   - otra más baja, mirando un poco hacia arriba;
   - otra más alta, mirando un poco hacia abajo.
5. **Producto:** colócalo sobre una mesa, sin nada alrededor, y da dos o tres vueltas completas a medio metro. Que se vea la superficie de apoyo alrededor.
6. **Local:** colócate en el centro y gira sobre ti mismo. Después recorre el perímetro mirando hacia el centro. Si puedes, cubre cada zona desde dos puntos distintos.
7. **Evita** espejos grandes, cristales y superficies muy brillantes. Salen como «niebla».
8. **Duración:** un producto, de 1 a 2 minutos; un rincón o una barra, de 2 a 4 minutos; un local entero, unos 5 minutos.

## Qué me envías

- El archivo exportado: `.spz` (mejor) o `.ply`.
- Una foto normal del mismo encuadre que quieres de portada. La uso como póster mientras carga y para móviles sin WebGL.
- El nombre del negocio y la confirmación de que tienes el permiso.

## Qué hago yo

1. Recorto el escaneo para quitar el ruido de los bordes y el suelo sobrante, y lo oriento.
2. Lo comprimo a `.spz`, con un objetivo de menos de 8 MB para el escaneo de un local y menos de 3 MB para el de un producto.
3. Lo integro en el hero con parallax suave (no se puede girar libremente; en un espacio real eso delata el truco).
4. Añado el póster, la carga diferida y el fallback, igual que en el resto de demos.
