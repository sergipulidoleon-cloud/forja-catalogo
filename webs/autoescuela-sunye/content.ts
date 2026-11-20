import { createI18n } from '../_kit';

const es = {
  nav: { permisos: 'Permisos', como: 'Cómo funciona', visita: 'Dónde estamos', matricula: 'Matrícula' },
  hero: {
    title: 'Sácate el carnet con quien enseña a conducir en Collblanc desde 1979',
    lead: 'Autoescuela Sunyé: aulas propias, coches propios y profesores que conocen cada calle del examen.',
    cta: 'Pedir información',
    call: 'Llamar al 933 334 958',
    sceneAlt: 'Cono de tráfico real escaneado en 3D, gastado por el uso; se puede girar arrastrando',
  },
  permisos: {
    title: 'Permisos',
    intro: 'Elige tu señal. Precios y promociones, a consultar.',
    items: [
      { code: 'B', n: 'Coche', d: 'El carnet de siempre: teórico, prácticas y examen.', shape: 'circle' },
      { code: 'A2', n: 'Moto', d: 'Para motos de hasta 35 kW.', shape: 'triangle' },
      { code: 'A1', n: 'Moto ligera', d: 'Desde los 16 años, hasta 125 cc.', shape: 'triangle' },
      { code: 'AM', n: 'Ciclomotor', d: 'Desde los 15 años.', shape: 'square' },
    ],
    note: 'Permisos de ejemplo; la autoescuela confirma su oferta en su web actual.',
  },
  como: {
    title: 'Del teórico al examen',
    steps: [
      { n: 'Teórico', d: 'Clases en el aula y tests para practicar en casa.' },
      { n: 'Prácticas', d: 'Con coche de la autoescuela y por las rutas del examen.' },
      { n: 'Examen', d: 'Te acompañamos el día de la prueba.' },
    ],
  },
  galeria: { title: 'La autoescuela', photos: ['El aula de teórico', 'Nuestros coches', 'Primer día con el carnet'] },
  resenas: {
    title: 'Aprobados',
    items: [
      { t: 'Aprobé a la primera el práctico. Mi profesor me hizo hacer las rutas del examen hasta que me salían solas.', w: 'Alumno de 19 años' },
      { t: 'Trato muy cercano y horarios flexibles para quien trabaja.', w: 'Alumna de permiso B' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'Ctra. de Collblanc, 37, 08903 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    email: 'Correo',
    hours: 'Horario',
    mapTitle: 'Mapa de Autoescuela Sunyé',
  },
  matricula: { title: 'Pide información', text: 'Dinos qué permiso te interesa y te llamamos con precios y horarios.', submit: 'Quiero información', permit: 'Permiso' },
  footer: 'Autoescuela Sunyé, desde 1979',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { permisos: 'Permisos', como: 'Com funciona', visita: 'On som', matricula: 'Matrícula' },
  hero: {
    title: "Treu-te el carnet amb qui ensenya a conduir a Collblanc des del 1979",
    lead: "Autoescola Sunyé: aules pròpies, cotxes propis i professors que coneixen cada carrer de l'examen.",
    cta: 'Demanar informació',
    call: 'Trucar al 933 334 958',
    sceneAlt: "Con de trànsit real escanejat en 3D, gastat per l'ús; es pot girar arrossegant",
  },
  permisos: {
    title: 'Permisos',
    intro: 'Tria el teu senyal. Preus i promocions, a consultar.',
    items: [
      { code: 'B', n: 'Cotxe', d: 'El carnet de sempre: teòric, pràctiques i examen.', shape: 'circle' },
      { code: 'A2', n: 'Moto', d: 'Per a motos de fins a 35 kW.', shape: 'triangle' },
      { code: 'A1', n: 'Moto lleugera', d: 'Des dels 16 anys, fins a 125 cc.', shape: 'triangle' },
      { code: 'AM', n: 'Ciclomotor', d: 'Des dels 15 anys.', shape: 'square' },
    ],
    note: "Permisos d'exemple; l'autoescola confirma la seva oferta al seu web actual.",
  },
  como: {
    title: "Del teòric a l'examen",
    steps: [
      { n: 'Teòric', d: "Classes a l'aula i tests per practicar a casa." },
      { n: 'Pràctiques', d: "Amb cotxe de l'autoescola i per les rutes de l'examen." },
      { n: 'Examen', d: "T'acompanyem el dia de la prova." },
    ],
  },
  galeria: { title: "L'autoescola", photos: ["L'aula de teòric", 'Els nostres cotxes', 'Primer dia amb el carnet'] },
  resenas: {
    title: 'Aprovats',
    items: [
      { t: "Vaig aprovar el pràctic a la primera. El meu professor em va fer fer les rutes de l'examen fins que em sortien soles.", w: 'Alumne de 19 anys' },
      { t: 'Tracte molt proper i horaris flexibles per a qui treballa.', w: 'Alumna de permís B' },
    ],
  },
  visita: {
    title: 'On som',
    address: 'Ctra. de Collblanc, 37, 08903 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    email: 'Correu',
    hours: 'Horari',
    mapTitle: "Mapa de l'Autoescola Sunyé",
  },
  matricula: { title: 'Demana informació', text: "Digues-nos quin permís t'interessa i et truquem amb preus i horaris.", submit: 'Vull informació', permit: 'Permís' },
  footer: 'Autoescola Sunyé, des del 1979',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
