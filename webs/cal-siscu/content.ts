import { createI18n } from '../_kit';

const es = {
  nav: { carta: 'Carta', historia: 'Historia', visita: 'Visita', reservar: 'Reservar mesa' },
  hero: {
    since: 'Bodega desde 1933',
    lead: 'Marisco fresco en Collblanc, en la misma casa donde Siscu despachaba vino a granel. El bogavante con salsa sigue siendo lo que más se pide.',
    reservar: 'Reservar mesa',
    llamar: 'Llamar',
    sceneAlt: 'Bogavante rojo sobre hielo picado, moviendo las pinzas',
  },
  carta: {
    title: 'La pizarra de hoy',
    intro: 'El marisco cambia con la lonja. Los precios se marcan cada día según mercado.',
    groups: [
      { name: 'Del vivero', items: ['Bogavante con salsa', 'Langosta a la plancha', 'Cigalas'] },
      { name: 'De la lonja', items: ['Gambas a la plancha', 'Navajas', 'Almejas a la marinera'] },
      { name: 'Para picar', items: ['Pan con tomate', 'Calamares', 'Pimientos del Padrón'] },
    ],
    market: 'Según mercado',
  },
  historia: {
    title: 'Tres generaciones en la misma esquina',
    steps: [
      { year: '1933', text: 'Francisco «Siscu» Rosés abre una bodega: vino y licores a granel para el barrio.' },
      { year: 'Después', text: 'Su hijo Toni y Dolors toman el relevo. Dolors empieza a cocinar marisco fresco en la cocina de la familia.' },
      { year: 'Hoy', text: 'La bodega es una marisquería con miles de reseñas, pero la barra y el nombre siguen siendo los de siempre.' },
    ],
    source: 'Historia según el reportaje de Culinary Backstreets sobre la casa.',
  },
  galeria: { title: 'La casa', photos: ['La barra y las botas de vino', 'El vivero', 'Bogavante con salsa', 'El comedor'] },
  resenas: {
    title: 'Dicen de nosotros',
    items: [
      { text: 'El bogavante con salsa justifica el viaje desde Barcelona. Mojad pan.', who: 'Cliente de fin de semana' },
      { text: 'Ambiente de bodega de verdad, sin postureo. Marisco fresquísimo.', who: 'Vecino de Collblanc' },
      { text: 'Fuimos después del partido y nos hicieron hueco. Volveremos.', who: 'Grupo de amigos' },
    ],
  },
  visita: {
    title: 'Cómo llegar',
    address: 'C/ del Doctor Martí i Julià, Collblanc, L’Hospitalet de Llobregat',
    addressNote: 'Número por confirmar con el negocio.',
    metro: 'Metro Collblanc (L5), a pocos minutos a pie del Camp Nou.',
    hours: 'Horario',
    phone: 'Teléfono',
    phonePending: 'Por confirmar',
    mapTitle: 'Mapa de Cal Síscu',
  },
  reserva: { title: 'Reserva tu mesa', text: 'Para grupos o días de partido, mejor con antelación.', submit: 'Pedir mesa' },
  footer: 'Cal Síscu, en Collblanc',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { carta: 'Carta', historia: 'Història', visita: 'Visita', reservar: 'Reservar taula' },
  hero: {
    since: 'Bodega des de 1933',
    lead: 'Marisc fresc a Collblanc, a la mateixa casa on en Siscu despatxava vi a granel. El llamàntol amb salsa continua sent el que més es demana.',
    reservar: 'Reservar taula',
    llamar: 'Trucar',
    sceneAlt: 'Llamàntol vermell sobre gel picat, movent les pinces',
  },
  carta: {
    title: 'La pissarra d’avui',
    intro: 'El marisc canvia amb la llotja. Els preus es marquen cada dia segons mercat.',
    groups: [
      { name: 'Del viver', items: ['Llamàntol amb salsa', 'Llagosta a la planxa', 'Escamarlans'] },
      { name: 'De la llotja', items: ['Gambes a la planxa', 'Navalles', 'Cloïsses a la marinera'] },
      { name: 'Per picar', items: ['Pa amb tomàquet', 'Calamars', 'Pebrots del Padró'] },
    ],
    market: 'Segons mercat',
  },
  historia: {
    title: 'Tres generacions a la mateixa cantonada',
    steps: [
      { year: '1933', text: 'Francisco «Siscu» Rosés obre una bodega: vi i licors a granel per al barri.' },
      { year: 'Després', text: 'El seu fill Toni i la Dolors agafen el relleu. La Dolors comença a cuinar marisc fresc a la cuina de la família.' },
      { year: 'Avui', text: 'La bodega és una marisqueria amb milers de ressenyes, però la barra i el nom continuen sent els de sempre.' },
    ],
    source: 'Història segons el reportatge de Culinary Backstreets sobre la casa.',
  },
  galeria: { title: 'La casa', photos: ['La barra i les bótes de vi', 'El viver', 'Llamàntol amb salsa', 'El menjador'] },
  resenas: {
    title: 'Diuen de nosaltres',
    items: [
      { text: 'El llamàntol amb salsa justifica el viatge des de Barcelona. Suqueu pa.', who: 'Client de cap de setmana' },
      { text: 'Ambient de bodega de debò, sense postureig. Marisc fresquíssim.', who: 'Veí de Collblanc' },
      { text: 'Hi vam anar després del partit i ens van fer lloc. Hi tornarem.', who: 'Colla d’amics' },
    ],
  },
  visita: {
    title: 'Com arribar-hi',
    address: 'C/ del Doctor Martí i Julià, Collblanc, L’Hospitalet de Llobregat',
    addressNote: 'Número per confirmar amb el negoci.',
    metro: 'Metro Collblanc (L5), a pocs minuts a peu del Camp Nou.',
    hours: 'Horari',
    phone: 'Telèfon',
    phonePending: 'Per confirmar',
    mapTitle: 'Mapa de Cal Síscu',
  },
  reserva: { title: 'Reserva la teva taula', text: 'Per a grups o dies de partit, millor amb antelació.', submit: 'Demanar taula' },
  footer: 'Cal Síscu, a Collblanc',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
