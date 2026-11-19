import { createI18n } from '../_kit';

const es = {
  nav: { carta: 'La carta', casa: 'La casa', visita: 'Dónde estamos', reservar: 'Reservar' },
  hero: {
    title: 'El Racó del Cargol',
    lead: 'Cocina catalana de toda la vida en Collblanc: caracoles a la llauna, brasa y sobremesa sin prisas.',
    reservar: 'Reservar mesa',
    llamar: 'Llamar al 93 449 77 18',
    sceneAlt: 'Un caracol de concha dorada avanza despacio hacia el cursor',
  },
  carta: {
    title: 'La carta',
    note: 'Una carta de ejemplo para enseñar el diseño. Los platos y precios reales los pone la casa.',
    cols: [
      {
        name: 'Caracoles',
        items: [
          { n: 'Caracoles a la llauna', d: 'Con allioli y sal gorda, como se hacen en Lleida.' },
          { n: 'Caracoles a la gormanda', d: 'En salsa con sofrito, jamón y un punto picante.' },
          { n: 'Cazuelita de caracoles', d: 'Para compartir al centro.' },
        ],
      },
      {
        name: 'De la brasa y la cazuela',
        items: [
          { n: 'Butifarra con judías', d: 'De payés, a la brasa de encina.' },
          { n: 'Conejo con allioli', d: 'Dorado a la brasa.' },
          { n: 'Crema catalana', d: 'Quemada en el momento.' },
        ],
      },
    ],
  },
  casa: { title: 'La casa', text: 'Comedores tranquilos, mantel de tela y servicio de los de antes, a dos calles del metro de Collblanc.', photos: ['La llauna recién salida', 'El comedor', 'La brasa'] },
  resenas: {
    title: 'Sobremesas',
    items: [
      { t: 'Los caracoles a la llauna, de los mejores que he comido fuera de Lleida.', w: 'Cliente habitual' },
      { t: 'Comida casera de verdad y un servicio de toda la vida.', w: 'Familia de Collblanc' },
      { t: 'Fuimos antes del partido y comimos de maravilla sin agobios.', w: 'Visitante del Camp Nou' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'C/ del Doctor Martí i Julià, 54, 08903 L’Hospitalet de Llobregat',
    metro: 'Metro Collblanc (L5)',
    phone: 'Teléfono',
    hours: 'Horario',
    mapTitle: 'Mapa de El Racó del Cargol',
    phoneSource: 'Teléfono que figura en guías gastronómicas; conviene confirmarlo.',
  },
  reserva: { title: 'Reservar mesa', text: 'Para grupos y fines de semana, mejor reservar con un par de días de margen.', submit: 'Pedir mesa' },
  footer: 'El Racó del Cargol, en Collblanc',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { carta: 'La carta', casa: 'La casa', visita: 'On som', reservar: 'Reservar' },
  hero: {
    title: 'El Racó del Cargol',
    lead: 'Cuina catalana de tota la vida a Collblanc: cargols a la llauna, brasa i sobretaula sense presses.',
    reservar: 'Reservar taula',
    llamar: 'Trucar al 93 449 77 18',
    sceneAlt: 'Un cargol de closca daurada avança a poc a poc cap al cursor',
  },
  carta: {
    title: 'La carta',
    note: "Una carta d'exemple per ensenyar el disseny. Els plats i preus reals els posa la casa.",
    cols: [
      {
        name: 'Cargols',
        items: [
          { n: 'Cargols a la llauna', d: 'Amb allioli i sal grossa, com es fan a Lleida.' },
          { n: 'Cargols a la gormanda', d: 'En salsa amb sofregit, pernil i un punt picant.' },
          { n: 'Cassoleta de cargols', d: 'Per compartir al mig.' },
        ],
      },
      {
        name: 'De la brasa i la cassola',
        items: [
          { n: 'Botifarra amb mongetes', d: "De pagès, a la brasa d'alzina." },
          { n: 'Conill amb allioli', d: 'Daurat a la brasa.' },
          { n: 'Crema catalana', d: 'Cremada al moment.' },
        ],
      },
    ],
  },
  casa: { title: 'La casa', text: 'Menjadors tranquils, estovalles de roba i servei dels d’abans, a dos carrers del metro de Collblanc.', photos: ['La llauna acabada de sortir', 'El menjador', 'La brasa'] },
  resenas: {
    title: 'Sobretaules',
    items: [
      { t: 'Els cargols a la llauna, dels millors que he menjat fora de Lleida.', w: 'Client habitual' },
      { t: 'Menjar casolà de debò i un servei de tota la vida.', w: 'Família de Collblanc' },
      { t: 'Hi vam anar abans del partit i vam dinar de meravella sense agobis.', w: 'Visitant del Camp Nou' },
    ],
  },
  visita: {
    title: 'On som',
    address: 'C/ del Doctor Martí i Julià, 54, 08903 L’Hospitalet de Llobregat',
    metro: 'Metro Collblanc (L5)',
    phone: 'Telèfon',
    hours: 'Horari',
    mapTitle: 'Mapa d’El Racó del Cargol',
    phoneSource: 'Telèfon que figura en guies gastronòmiques; convé confirmar-lo.',
  },
  reserva: { title: 'Reservar taula', text: 'Per a grups i caps de setmana, millor reservar amb un parell de dies de marge.', submit: 'Demanar taula' },
  footer: 'El Racó del Cargol, a Collblanc',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
