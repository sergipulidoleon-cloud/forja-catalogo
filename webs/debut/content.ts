import { createI18n } from '../_kit';

const es = {
  nav: { menu: 'Menú', casa: 'La casa', visita: 'Reservas', reservar: 'Reservar' },
  hero: {
    title: 'Debut',
    claim: 'Cocina catalana sin etiquetas, en una antigua bodega de La Torrassa',
    lead: 'Producto, temporada y técnica. Guillem Salazar cocina lo que trae el mercado; al mediodía, menú de laborables.',
    reservar: 'Reservar mesa',
    llamar: 'Llamar',
    sceneAlt: 'Porción de pastel de chocolate sobre un plato de loza antiguo, escaneada en 3D; se puede girar arrastrando',
  },
  menu: {
    title: 'El recorrido',
    intro: 'Un menú degustación cambia con cada temporada. Este es un ejemplo de su estructura.',
    steps: [
      { n: 'Aperitivo', d: 'Un bocado para abrir: encurtidos de la casa y pan de masa madre.' },
      { n: 'Huerta', d: 'Verdura de temporada, cruda y asada en el mismo plato.' },
      { n: 'Mar', d: 'Pescado de lonja con un fondo tostado.' },
      { n: 'Brasa', d: 'Carne de proximidad, jugo reducido.' },
      { n: 'Postre', d: 'Fruta, lácteo y algo crujiente.' },
    ],
    weekday: 'Menú de mediodía de laborables',
  },
  casa: {
    title: 'La casa',
    text: 'En 2016, Guillem Salazar e Ignasi Redón convirtieron una vieja bodega en un comedor informal. Hoy Guillem sigue al frente de los fogones.',
    source: 'Historia según Time Out y el diario Ara.',
    photos: ['La barra de la antigua bodega', 'El pase de cocina', 'Un plato de temporada'],
  },
  resenas: {
    title: 'Comensales',
    items: [
      { t: 'De los menús de mediodía más serios de la zona. Producto y punto perfectos.', w: 'Cliente de mediodía' },
      { t: 'Cocina de autor sin pretensiones. Volveremos con la temporada.', w: 'Pareja de Barcelona' },
    ],
  },
  visita: {
    title: 'Reservas',
    address: 'C/ de Lleida, 32, L’Hospitalet de Llobregat',
    metro: 'Metro Torrassa (L1 y L9)',
    phone: 'Teléfono',
    hours: 'Horario',
    hoursText: 'Comidas de miércoles a domingo; cenas de jueves a sábado. Lunes y martes, cerrado.',
    hoursSource: 'Horario según Time Out; conviene confirmarlo con el restaurante.',
    mapTitle: 'Mapa de Debut',
  },
  reserva: { title: 'Reserva', text: 'Dinos día y hora. Te confirmamos la mesa.', submit: 'Pedir mesa' },
  footer: 'Debut, La Torrassa',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { menu: 'Menú', casa: 'La casa', visita: 'Reserves', reservar: 'Reservar' },
  hero: {
    title: 'Debut',
    claim: 'Cuina catalana sense etiquetes, en una antiga bodega de la Torrassa',
    lead: 'Producte, temporada i tècnica. En Guillem Salazar cuina el que porta el mercat; al migdia, menú de feiners.',
    reservar: 'Reservar taula',
    llamar: 'Trucar',
    sceneAlt: 'Porció de pastís de xocolata sobre un plat de pisa antic, escanejada en 3D; es pot girar arrossegant',
  },
  menu: {
    title: 'El recorregut',
    intro: "Un menú degustació canvia amb cada temporada. Aquest és un exemple de la seva estructura.",
    steps: [
      { n: 'Aperitiu', d: 'Un mos per obrir: confitats de la casa i pa de massa mare.' },
      { n: 'Horta', d: 'Verdura de temporada, crua i rostida al mateix plat.' },
      { n: 'Mar', d: 'Peix de llotja amb un fons torrat.' },
      { n: 'Brasa', d: 'Carn de proximitat, suc reduït.' },
      { n: 'Postres', d: 'Fruita, lacti i alguna cosa cruixent.' },
    ],
    weekday: 'Menú de migdia de feiners',
  },
  casa: {
    title: 'La casa',
    text: "El 2016, Guillem Salazar i Ignasi Redón van convertir una vella bodega en un menjador informal. Avui en Guillem continua al capdavant dels fogons.",
    source: 'Història segons Time Out i el diari Ara.',
    photos: ["La barra de l'antiga bodega", 'El pas de cuina', 'Un plat de temporada'],
  },
  resenas: {
    title: 'Comensals',
    items: [
      { t: 'Dels menús de migdia més seriosos de la zona. Producte i punt perfectes.', w: 'Client de migdia' },
      { t: "Cuina d'autor sense pretensions. Hi tornarem amb la temporada.", w: 'Parella de Barcelona' },
    ],
  },
  visita: {
    title: 'Reserves',
    address: 'C/ de Lleida, 32, L’Hospitalet de Llobregat',
    metro: 'Metro Torrassa (L1 i L9)',
    phone: 'Telèfon',
    hours: 'Horari',
    hoursText: 'Dinars de dimecres a diumenge; sopars de dijous a dissabte. Dilluns i dimarts, tancat.',
    hoursSource: 'Horari segons Time Out; convé confirmar-lo amb el restaurant.',
    mapTitle: 'Mapa de Debut',
  },
  reserva: { title: 'Reserva', text: 'Digues-nos dia i hora. Et confirmem la taula.', submit: 'Demanar taula' },
  footer: 'Debut, la Torrassa',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
