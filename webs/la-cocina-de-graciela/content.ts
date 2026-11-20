import { createI18n } from '../_kit';

const es = {
  nav: { carta: 'Carta', fonda: 'La fonda', visita: 'Visítanos', reservar: 'Reservar' },
  hero: {
    title: 'La Cocina de Graciela',
    lead: 'Comida mexicana casera en La Torrassa. Nachos, burritos, pozole los fines de semana y margaritas bien frías.',
    reservar: 'Reservar mesa',
    whatsapp: 'Pedir por WhatsApp',
    sceneAlt: 'Aguacate escaneado en 3D; se puede girar arrastrando',
  },
  carta: {
    title: 'Nuestra lotería',
    intro: 'Cada plato, su carta. Los que más nos piden, según las reseñas de nuestros clientes.',
    cards: [
      { n: 1, name: 'El Pozole', d: 'Solo los fines de semana, como en casa.', tone: 'rosa' },
      { n: 2, name: 'Los Nachos', d: 'Con versión vegana, muy pedida.', tone: 'oro' },
      { n: 3, name: 'El Burrito', d: 'Grande y bien relleno.', tone: 'turquesa' },
      { n: 4, name: 'La Margarita', d: 'Clásica o de sabores.', tone: 'cacao' },
      { n: 5, name: 'El Mojito', d: 'Para la sobremesa.', tone: 'oro' },
      { n: 6, name: 'Los Tacos', d: 'Tortilla de maíz y salsa de la casa.', tone: 'rosa' },
    ],
  },
  fonda: { title: 'La fonda', text: 'Un pasaje tranquilo de La Torrassa, mesas llenas y el olor del comal desde la puerta.', photos: ['El comedor', 'Pozole de fin de semana', 'La barra de margaritas'] },
  resenas: {
    title: 'Lo que dicen en la mesa',
    items: [
      { t: 'El pozole del sábado me recordó a mi abuela. Volveremos cada fin de semana.', w: 'Cliente habitual' },
      { t: 'Los nachos veganos son de lo mejor que he probado en Barcelona.', w: 'Clienta vegana' },
      { t: 'Siempre está lleno, así que reservad. Merece la pena.', w: 'Grupo de amigas' },
    ],
  },
  visita: {
    title: 'Visítanos',
    address: 'Passatge del Xiprer, 5, 08903 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phoneNote: 'Teléfono que aparece en guías; conviene confirmarlo.',
    hours: 'Horario',
    mapTitle: 'Mapa de La Cocina de Graciela',
  },
  reserva: { title: '¿Mesa para cuántos?', text: 'Somos un sitio popular: reservar es la mejor forma de no esperar.', submit: 'Reservar mesa' },
  footer: 'La Cocina de Graciela, cocina mexicana en L’Hospitalet',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { carta: 'Carta', fonda: 'La fonda', visita: 'Visita’ns', reservar: 'Reservar' },
  hero: {
    title: 'La Cocina de Graciela',
    lead: 'Menjar mexicà casolà a la Torrassa. Nachos, burritos, pozole els caps de setmana i margarites ben fredes.',
    reservar: 'Reservar taula',
    whatsapp: 'Demanar per WhatsApp',
    sceneAlt: 'Alvocat escanejat en 3D; es pot girar arrossegant',
  },
  carta: {
    title: 'La nostra loteria',
    intro: 'Cada plat, la seva carta. Els que més ens demanen, segons les ressenyes dels nostres clients.',
    cards: [
      { n: 1, name: 'El Pozole', d: 'Només els caps de setmana, com a casa.', tone: 'rosa' },
      { n: 2, name: 'Els Nachos', d: 'Amb versió vegana, molt demanada.', tone: 'oro' },
      { n: 3, name: 'El Burrito', d: 'Gran i ben farcit.', tone: 'turquesa' },
      { n: 4, name: 'La Margarita', d: 'Clàssica o de sabors.', tone: 'cacao' },
      { n: 5, name: 'El Mojito', d: 'Per a la sobretaula.', tone: 'oro' },
      { n: 6, name: 'Els Tacos', d: 'Truita de blat de moro i salsa de la casa.', tone: 'rosa' },
    ],
  },
  fonda: { title: 'La fonda', text: "Un passatge tranquil de la Torrassa, taules plenes i l'olor del comal des de la porta.", photos: ['El menjador', 'Pozole de cap de setmana', 'La barra de margarites'] },
  resenas: {
    title: 'El que diuen a taula',
    items: [
      { t: "El pozole del dissabte em va recordar l'àvia. Hi tornarem cada cap de setmana.", w: 'Client habitual' },
      { t: 'Els nachos vegans són dels millors que he provat a Barcelona.', w: 'Clienta vegana' },
      { t: 'Sempre és ple, així que reserveu. Val la pena.', w: "Colla d'amigues" },
    ],
  },
  visita: {
    title: 'Visita’ns',
    address: 'Passatge del Xiprer, 5, 08903 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phoneNote: 'Telèfon que apareix en guies; convé confirmar-lo.',
    hours: 'Horari',
    mapTitle: 'Mapa de La Cocina de Graciela',
  },
  reserva: { title: 'Taula per a quants?', text: 'Som un lloc popular: reservar és la millor manera de no esperar.', submit: 'Reservar taula' },
  footer: 'La Cocina de Graciela, cuina mexicana a L’Hospitalet',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
