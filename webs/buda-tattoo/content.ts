import { createI18n } from '../_kit';

const es = {
  nav: { trabajos: 'Trabajos', estudio: 'El estudio', visita: 'Visítanos', cita: 'Pedir presupuesto' },
  hero: {
    title: 'Buda Tattoo',
    lead: 'Estudio familiar de tatuaje en L’Hospitalet desde hace más de 25 años. Tatuaje, piercing y microblading, con calma y con higiene de hospital.',
    cita: 'Pedir presupuesto',
    trabajos: 'Ver trabajos',
    sceneAlt: 'Máquina de tatuar de bobinas dorada que deja caer una gota de tinta',
  },
  trabajos: {
    title: 'Trabajos',
    intro: 'Filtra por estilo. En la web real aquí iría vuestro portfolio.',
    filters: ['Todos', 'Tradicional', 'Fine line', 'Blackwork', 'Realismo'],
    items: [
      { c: 'Tradicional', t: 'Golondrina tradicional' },
      { c: 'Fine line', t: 'Rama botánica en línea fina' },
      { c: 'Blackwork', t: 'Mandala en blackwork' },
      { c: 'Realismo', t: 'Retrato en grises' },
      { c: 'Tradicional', t: 'Tigre japonés' },
      { c: 'Fine line', t: 'Lettering fino' },
      { c: 'Blackwork', t: 'Geométrico' },
    ],
  },
  servicios: {
    title: 'El estudio',
    items: [
      { n: 'Tatuaje', d: 'Diseño propio o a partir de tu idea. Primera cita para dibujar juntos.' },
      { n: 'Piercing', d: 'Material quirúrgico y joyería de calidad.' },
      { n: 'Microblading', d: 'Cejas pelo a pelo, con revisión incluida.' },
    ],
    note: 'Servicios que aparecen en la web actual del estudio.',
  },
  resenas: {
    title: 'Piel y tinta',
    items: [
      { t: 'Tercer tatuaje con ellos. Limpieza impecable y mucha paciencia con el diseño.', w: 'Clienta de fine line' },
      { t: 'Me hicieron el primer piercing a los 18 y ahora vengo con mi hija.', w: 'Clienta de hace años' },
    ],
  },
  visita: {
    title: 'Visítanos',
    address: 'Passatge de Blanchart, 7, L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    email: 'Correo',
    hours: 'Horario',
    rows: [
      { d: 'Martes a sábado', h: '11:00 a 14:00 y 16:30 a 20:30' },
      { d: 'Domingo y lunes', h: 'Cerrado' },
    ],
    mapTitle: 'Mapa de Buda Tattoo',
  },
  cita: { title: 'Cuéntanos tu idea', text: 'Zona del cuerpo, tamaño aproximado y estilo. Te respondemos con presupuesto.', submit: 'Pedir presupuesto', style: 'Estilo' },
  footer: 'Buda Tattoo, estudio familiar',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { trabajos: 'Treballs', estudio: "L'estudi", visita: 'Visita’ns', cita: 'Demanar pressupost' },
  hero: {
    title: 'Buda Tattoo',
    lead: "Estudi familiar de tatuatge a L'Hospitalet des de fa més de 25 anys. Tatuatge, pírcing i microblading, amb calma i amb higiene d'hospital.",
    cita: 'Demanar pressupost',
    trabajos: 'Veure treballs',
    sceneAlt: 'Màquina de tatuar de bobines daurada que deixa caure una gota de tinta',
  },
  trabajos: {
    title: 'Treballs',
    intro: "Filtra per estil. Al web real aquí hi aniria el vostre portfoli.",
    filters: ['Tots', 'Tradicional', 'Fine line', 'Blackwork', 'Realisme'],
    items: [
      { c: 'Tradicional', t: 'Oreneta tradicional' },
      { c: 'Fine line', t: 'Branca botànica en línia fina' },
      { c: 'Blackwork', t: 'Mandala en blackwork' },
      { c: 'Realisme', t: 'Retrat en grisos' },
      { c: 'Tradicional', t: 'Tigre japonès' },
      { c: 'Fine line', t: 'Lettering fi' },
      { c: 'Blackwork', t: 'Geomètric' },
    ],
  },
  servicios: {
    title: "L'estudi",
    items: [
      { n: 'Tatuatge', d: 'Disseny propi o a partir de la teva idea. Primera cita per dibuixar junts.' },
      { n: 'Pírcing', d: 'Material quirúrgic i joieria de qualitat.' },
      { n: 'Microblading', d: 'Celles pèl a pèl, amb revisió inclosa.' },
    ],
    note: "Serveis que apareixen al web actual de l'estudi.",
  },
  resenas: {
    title: 'Pell i tinta',
    items: [
      { t: 'Tercer tatuatge amb ells. Neteja impecable i molta paciència amb el disseny.', w: 'Clienta de fine line' },
      { t: 'Em van fer el primer pírcing als 18 i ara hi vinc amb la meva filla.', w: 'Clienta de fa anys' },
    ],
  },
  visita: {
    title: 'Visita’ns',
    address: 'Passatge de Blanchart, 7, L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    email: 'Correu',
    hours: 'Horari',
    rows: [
      { d: 'De dimarts a dissabte', h: '11:00 a 14:00 i 16:30 a 20:30' },
      { d: 'Diumenge i dilluns', h: 'Tancat' },
    ],
    mapTitle: 'Mapa de Buda Tattoo',
  },
  cita: { title: "Explica'ns la teva idea", text: 'Zona del cos, mida aproximada i estil. Et responem amb pressupost.', submit: 'Demanar pressupost', style: 'Estil' },
  footer: 'Buda Tattoo, estudi familiar',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
