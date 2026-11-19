import { createI18n } from '../_kit';

const es = {
  nav: { clases: 'Clases', horario: 'Horario', visita: 'Dónde', prueba: 'Clase de prueba' },
  hero: {
    title: 'Respira. Lo demás viene después.',
    lead: 'l’Essència: yoga y pilates en grupos reducidos, con dos salas tranquilas en la calle Rodés de L’Hospitalet.',
    cta: 'Reservar clase de prueba',
    call: 'Llamar',
    inhale: 'Inspira',
    exhale: 'Espira',
    sceneAlt: 'Esfera orgánica que se expande y se contrae al ritmo de una respiración lenta',
  },
  clases: {
    title: 'Clases',
    items: [
      { n: 'Hatha yoga', d: 'Posturas, respiración y relajación. Para empezar o para volver.' },
      { n: 'Pilates mat', d: 'Fuerza del centro, espalda sana y control del movimiento.' },
      { n: 'Yoga suave', d: 'Ritmo lento, ideal para mayores o tras una lesión.' },
      { n: 'Zumba', d: 'Para quien quiere sudar y reír a partes iguales.' },
    ],
    note: 'Tipos de clase de ejemplo según su ficha en directorios; el centro confirma su oferta.',
  },
  horario: {
    title: 'Horario semanal',
    caption: 'Horario de ejemplo para enseñar el diseño. El centro publica el suyo.',
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
    rows: [
      { h: '09:30', c: ['Hatha', '', 'Hatha', '', 'Yoga suave'] },
      { h: '18:00', c: ['Pilates', 'Yoga suave', 'Pilates', 'Zumba', ''] },
      { h: '19:30', c: ['Zumba', 'Hatha', '', 'Pilates', 'Hatha'] },
    ],
  },
  espacio: { title: 'Dos salas, pocos alumnos', text: 'Grupos pequeños para que la profesora te vea, te corrija y sepa cómo estás.', photos: ['Sala grande', 'Sala de pilates'] },
  resenas: {
    title: 'Después de clase',
    items: [
      { t: 'Llevo un año y la espalda me ha cambiado. Grupos pequeños de verdad.', w: 'Alumna de pilates' },
      { t: 'Un rato de calma en mitad de la semana.', w: 'Alumno de hatha' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'C/ de Rodés, 12, L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phoneNote: 'Teléfono que aparece en directorios; conviene confirmarlo.',
    mapTitle: 'Mapa de l’Essència Yoga & Pilates',
  },
  prueba: { title: 'Ven a probar', text: 'Elige clase y te guardamos sitio.', submit: 'Reservar plaza', clase: 'Clase' },
  footer: 'l’Essència Yoga & Pilates',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { clases: 'Classes', horario: 'Horari', visita: 'On', prueba: 'Classe de prova' },
  hero: {
    title: 'Respira. La resta ve després.',
    lead: 'L’Essència: ioga i pilates en grups reduïts, amb dues sales tranquil·les al carrer Rodés de L’Hospitalet.',
    cta: 'Reservar classe de prova',
    call: 'Trucar',
    inhale: 'Inspira',
    exhale: 'Expira',
    sceneAlt: "Esfera orgànica que s'expandeix i es contrau al ritme d'una respiració lenta",
  },
  clases: {
    title: 'Classes',
    items: [
      { n: 'Hatha ioga', d: 'Postures, respiració i relaxació. Per començar o per tornar.' },
      { n: 'Pilates mat', d: "Força del centre, esquena sana i control del moviment." },
      { n: 'Ioga suau', d: "Ritme lent, ideal per a gent gran o després d'una lesió." },
      { n: 'Zumba', d: 'Per a qui vol suar i riure a parts iguals.' },
    ],
    note: "Tipus de classe d'exemple segons la seva fitxa en directoris; el centre confirma la seva oferta.",
  },
  horario: {
    title: 'Horari setmanal',
    caption: "Horari d'exemple per ensenyar el disseny. El centre publica el seu.",
    days: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv'],
    rows: [
      { h: '09:30', c: ['Hatha', '', 'Hatha', '', 'Ioga suau'] },
      { h: '18:00', c: ['Pilates', 'Ioga suau', 'Pilates', 'Zumba', ''] },
      { h: '19:30', c: ['Zumba', 'Hatha', '', 'Pilates', 'Hatha'] },
    ],
  },
  espacio: { title: 'Dues sales, pocs alumnes', text: "Grups petits perquè la professora et vegi, et corregeixi i sàpiga com estàs.", photos: ['Sala gran', 'Sala de pilates'] },
  resenas: {
    title: 'Després de classe',
    items: [
      { t: "Fa un any que hi vinc i l'esquena m'ha canviat. Grups petits de debò.", w: 'Alumna de pilates' },
      { t: 'Una estona de calma enmig de la setmana.', w: 'Alumne de hatha' },
    ],
  },
  visita: {
    title: 'On som',
    address: 'C/ de Rodés, 12, L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phoneNote: 'Telèfon que apareix en directoris; convé confirmar-lo.',
    mapTitle: 'Mapa de l’Essència Ioga & Pilates',
  },
  prueba: { title: 'Vine a provar', text: "Tria classe i et guardem lloc.", submit: 'Reservar plaça', clase: 'Classe' },
  footer: 'L’Essència Ioga & Pilates',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
