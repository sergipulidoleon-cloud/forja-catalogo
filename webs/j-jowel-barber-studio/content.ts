import { createI18n } from '../_kit';

const es = {
  nav: { cortes: 'Cortes', muro: 'El muro', visita: 'Dónde', cita: 'Reservar' },
  hero: {
    title: 'J Jowel',
    tag: 'Barber Studio en La Florida',
    lead: 'Fades limpios, diseños a máquina y barba perfilada. Si buscas un corte con personalidad, siéntate.',
    cita: 'Reservar silla',
    ig: 'Ver trabajos',
    sceneAlt: 'Navaja de barbero clásica de acero; se puede girar arrastrando',
  },
  cortes: {
    title: 'Cortes',
    items: [
      { n: 'Fade', d: 'Skin, low, mid o high. Degradado a cero.' },
      { n: 'Diseño', d: 'Líneas y dibujos a máquina. Tú traes la idea.' },
      { n: 'Barba', d: 'Perfilado, rebaje y toalla caliente.' },
      { n: 'Corte + barba', d: 'El combo completo.' },
      { n: 'Cejas', d: 'Limpieza rápida con navaja o cera.' },
    ],
  },
  muro: { title: 'El muro', text: 'Trabajos recientes del estudio. Aquí irían las fotos reales de cada corte.', photos: ['Skin fade con diseño', 'Barba perfilada', 'Mid fade texturizado', 'Línea a máquina'] },
  resenas: {
    title: 'Clientes',
    items: [
      { t: 'El mejor fade que me han hecho. Detallista a tope.', w: 'Cliente de La Florida' },
      { t: 'Le enseñé una foto de un diseño y lo clavó.', w: 'Cliente de 17 años' },
      { t: 'Buen rollo, buena música y puntual.', w: 'Cliente habitual' },
    ],
  },
  visita: {
    title: 'Dónde',
    address: 'C/ de Martí i Blasi, 34, 08905 L’Hospitalet de Llobregat',
    metro: 'A unos minutos a pie del metro Torrassa',
    hours: 'Horario',
    phone: 'Teléfono',
    phonePending: 'Por confirmar con el negocio',
    mapTitle: 'Mapa de J Jowel Barber Studio',
  },
  cita: { title: 'Reserva tu silla', text: 'Elige corte y día; te confirmamos la hora.', submit: 'Reservar', service: 'Corte' },
  footer: 'J Jowel Barber Studio, La Florida',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { cortes: 'Talls', muro: 'El mur', visita: 'On', cita: 'Reservar' },
  hero: {
    title: 'J Jowel',
    tag: 'Barber Studio a la Florida',
    lead: 'Fades nets, dissenys a màquina i barba perfilada. Si busques un tall amb personalitat, seu.',
    cita: 'Reservar cadira',
    ig: 'Veure treballs',
    sceneAlt: "Navalla de barber clàssica d'acer; es pot girar arrossegant",
  },
  cortes: {
    title: 'Talls',
    items: [
      { n: 'Fade', d: 'Skin, low, mid o high. Degradat a zero.' },
      { n: 'Disseny', d: 'Línies i dibuixos a màquina. Tu portes la idea.' },
      { n: 'Barba', d: 'Perfilat, rebaix i tovallola calenta.' },
      { n: 'Tall + barba', d: 'El combo complet.' },
      { n: 'Celles', d: 'Neteja ràpida amb navalla o cera.' },
    ],
  },
  muro: { title: 'El mur', text: "Treballs recents de l'estudi. Aquí hi anirien les fotos reals de cada tall.", photos: ['Skin fade amb disseny', 'Barba perfilada', 'Mid fade texturitzat', 'Línia a màquina'] },
  resenas: {
    title: 'Clients',
    items: [
      { t: "El millor fade que m'han fet. Detallista a tope.", w: 'Client de la Florida' },
      { t: "Li vaig ensenyar una foto d'un disseny i el va clavar.", w: 'Client de 17 anys' },
      { t: 'Bon rotllo, bona música i puntual.', w: 'Client habitual' },
    ],
  },
  visita: {
    title: 'On',
    address: 'C/ de Martí i Blasi, 34, 08905 L’Hospitalet de Llobregat',
    metro: 'A pocs minuts a peu del metro Torrassa',
    hours: 'Horari',
    phone: 'Telèfon',
    phonePending: 'Per confirmar amb el negoci',
    mapTitle: 'Mapa de J Jowel Barber Studio',
  },
  cita: { title: 'Reserva la teva cadira', text: "Tria tall i dia; et confirmem l'hora.", submit: 'Reservar', service: 'Tall' },
  footer: 'J Jowel Barber Studio, la Florida',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
