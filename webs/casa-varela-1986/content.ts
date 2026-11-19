import { createI18n } from '../_kit';

const es = {
  nav: { arroces: 'Arroces', casa: 'La casa', visita: 'Visítanos', reservar: 'Reservar' },
  hero: {
    title: 'Casa Varela 1986',
    lead: 'Arroces y marisco para compartir en L’Hospitalet. La paella llega a la mesa y la conversación se alarga.',
    reservar: 'Reservar mesa',
    llamar: 'Encargar arroz',
    sceneAlt: 'Paella vista desde arriba con gambas, mejillones y limón, humeando',
  },
  arroces: {
    title: 'Alrededor de la paella',
    intro: 'Cada arroz se hace al momento y para un mínimo de dos personas. Esta es una carta de ejemplo.',
    items: [
      { n: 'Paella de marisco', d: 'Gambas, cigalas y mejillones.' },
      { n: 'Arroz negro', d: 'Con sepia y allioli.' },
      { n: 'Arroz a banda', d: 'Caldo de roca, sin tropezones.' },
      { n: 'Arroz caldoso de bogavante', d: 'Para los domingos.' },
      { n: 'Fideuá', d: 'Fideo fino tostado.' },
      { n: 'Paella de verduras', d: 'De temporada.' },
    ],
  },
  casa: { title: 'Mesa larga, sobremesa larga', text: 'Comidas de familia, celebraciones y grupos que vuelven. Encarga tu arroz con antelación y lo tendremos a punto.', photos: ['La paella en la mesa', 'El socarrat', 'El comedor'] },
  resenas: {
    title: 'De sobremesa',
    items: [
      { t: 'El arroz negro, con un socarrat perfecto. Ya tenemos mesa para el mes que viene.', w: 'Cliente de domingo' },
      { t: 'Celebramos el cumpleaños de mi madre y nos trataron de maravilla.', w: 'Familia de L’Hospitalet' },
      { t: 'Marisco fresco y raciones generosas.', w: 'Cliente habitual' },
    ],
  },
  visita: {
    title: 'Visítanos',
    address: 'C/ de Blas Fernández Lirola, 82, L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phonePending: 'Por confirmar con el negocio',
    hours: 'Horario',
    mapTitle: 'Mapa de Casa Varela 1986',
  },
  reserva: { title: 'Reserva y encarga tu arroz', text: 'Dinos cuántos sois y qué arroz queréis. Te confirmamos por teléfono.', submit: 'Enviar reserva', rice: 'Arroz' },
  footer: 'Casa Varela 1986, arroces y marisco',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { arroces: 'Arrossos', casa: 'La casa', visita: 'Visita’ns', reservar: 'Reservar' },
  hero: {
    title: 'Casa Varela 1986',
    lead: 'Arrossos i marisc per compartir a L’Hospitalet. La paella arriba a taula i la conversa s’allarga.',
    reservar: 'Reservar taula',
    llamar: 'Encarregar arròs',
    sceneAlt: 'Paella vista des de dalt amb gambes, musclos i llimona, fumejant',
  },
  arroces: {
    title: 'Al voltant de la paella',
    intro: "Cada arròs es fa al moment i per a un mínim de dues persones. Aquesta és una carta d'exemple.",
    items: [
      { n: 'Paella de marisc', d: 'Gambes, escamarlans i musclos.' },
      { n: 'Arròs negre', d: 'Amb sípia i allioli.' },
      { n: 'Arròs a banda', d: 'Brou de roca, sense tropessons.' },
      { n: 'Arròs caldós de llamàntol', d: 'Per als diumenges.' },
      { n: 'Fideuà', d: 'Fideu fi torrat.' },
      { n: 'Paella de verdures', d: 'De temporada.' },
    ],
  },
  casa: { title: 'Taula llarga, sobretaula llarga', text: 'Dinars de família, celebracions i colles que tornen. Encarrega el teu arròs amb antelació i el tindrem a punt.', photos: ['La paella a taula', 'El socarrat', 'El menjador'] },
  resenas: {
    title: 'De sobretaula',
    items: [
      { t: "L'arròs negre, amb un socarrat perfecte. Ja tenim taula per al mes que ve.", w: 'Client de diumenge' },
      { t: "Vam celebrar l'aniversari de la meva mare i ens van tractar de meravella.", w: 'Família de L’Hospitalet' },
      { t: 'Marisc fresc i racions generoses.', w: 'Client habitual' },
    ],
  },
  visita: {
    title: 'Visita’ns',
    address: 'C/ de Blas Fernández Lirola, 82, L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phonePending: 'Per confirmar amb el negoci',
    hours: 'Horari',
    mapTitle: 'Mapa de Casa Varela 1986',
  },
  reserva: { title: "Reserva i encarrega l'arròs", text: 'Digues-nos quants sou i quin arròs voleu. Us ho confirmem per telèfon.', submit: 'Enviar reserva', rice: 'Arròs' },
  footer: 'Casa Varela 1986, arrossos i marisc',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
