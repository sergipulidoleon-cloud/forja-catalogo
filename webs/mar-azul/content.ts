import { createI18n } from '../_kit';

const es = {
  nav: { carta: 'Carta', local: 'El local', visita: 'Cómo llegar', reservar: 'Reservar' },
  hero: {
    title: 'Mar Azul',
    sub: 'Cevichería peruana en Collblanc',
    lead: 'Ceviche recién cortado, leche de tigre y sabores del Pacífico en la carretera de Collblanc.',
    reservar: 'Reservar mesa',
    pedir: 'Pedir para llevar',
    sceneAlt: 'Bol de ceviche con pescado, cebolla morada, choclo y lima sobre un mar que se mueve con el ratón',
  },
  carta: {
    title: 'La carta',
    intro: 'Carta de ejemplo con platos típicos peruanos; la definitiva la pone la casa.',
    groups: [
      { name: 'Del mar', items: ['Ceviche clásico', 'Ceviche mixto', 'Leche de tigre', 'Jalea de mariscos'] },
      { name: 'De la tierra', items: ['Lomo saltado', 'Ají de gallina', 'Causa limeña'] },
      { name: 'Para beber', items: ['Chicha morada', 'Pisco sour', 'Limonada'] },
    ],
  },
  local: { title: 'Un trozo de Lima en Collblanc', text: 'Mesas sencillas, música criolla y el olor del limón recién exprimido. Para comer rápido entre semana o alargar el sábado.', photos: ['El ceviche de la casa', 'El comedor', 'Pisco sour'] },
  resenas: {
    title: 'Lo que dicen',
    items: [
      { t: 'El ceviche está buenísimo, como en casa. Volveremos.', w: 'Cliente peruana' },
      { t: 'Raciones grandes y buen precio. La leche de tigre, imprescindible.', w: 'Vecino de Collblanc' },
      { t: 'Ideal antes del partido, a un paso del Camp Nou.', w: 'Visitante' },
    ],
  },
  visita: {
    title: 'Cómo llegar',
    address: 'Ctra. de Collblanc, 50, L’Hospitalet de Llobregat',
    metro: 'Metro Collblanc (L5)',
    phone: 'Teléfono',
    phonePending: 'Por confirmar con el negocio',
    hours: 'Horario',
    mapTitle: 'Mapa de Mar Azul',
  },
  reserva: { title: 'Reserva tu mesa', text: 'Los fines de semana se llena. Mejor reservar.', submit: 'Pedir mesa' },
  footer: 'Mar Azul, cocina peruana en Collblanc',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { carta: 'Carta', local: 'El local', visita: 'Com arribar-hi', reservar: 'Reservar' },
  hero: {
    title: 'Mar Azul',
    sub: 'Cevicheria peruana a Collblanc',
    lead: 'Ceviche acabat de tallar, llet de tigre i sabors del Pacífic a la carretera de Collblanc.',
    reservar: 'Reservar taula',
    pedir: 'Demanar per emportar',
    sceneAlt: 'Bol de ceviche amb peix, ceba morada, blat de moro i llima sobre un mar que es mou amb el ratolí',
  },
  carta: {
    title: 'La carta',
    intro: "Carta d'exemple amb plats típics peruans; la definitiva la posa la casa.",
    groups: [
      { name: 'Del mar', items: ['Ceviche clàssic', 'Ceviche mixt', 'Llet de tigre', 'Jalea de marisc'] },
      { name: 'De la terra', items: ['Lomo saltado', 'Ají de gallina', 'Causa limeña'] },
      { name: 'Per beure', items: ['Chicha morada', 'Pisco sour', 'Llimonada'] },
    ],
  },
  local: { title: 'Un tros de Lima a Collblanc', text: "Taules senzilles, música criolla i l'olor de la llimona acabada d'esprémer. Per menjar ràpid entre setmana o allargar el dissabte.", photos: ['El ceviche de la casa', 'El menjador', 'Pisco sour'] },
  resenas: {
    title: 'El que diuen',
    items: [
      { t: 'El ceviche és boníssim, com a casa. Hi tornarem.', w: 'Clienta peruana' },
      { t: 'Racions grans i bon preu. La llet de tigre, imprescindible.', w: 'Veí de Collblanc' },
      { t: 'Ideal abans del partit, a tocar del Camp Nou.', w: 'Visitant' },
    ],
  },
  visita: {
    title: 'Com arribar-hi',
    address: 'Ctra. de Collblanc, 50, L’Hospitalet de Llobregat',
    metro: 'Metro Collblanc (L5)',
    phone: 'Telèfon',
    phonePending: 'Per confirmar amb el negoci',
    hours: 'Horari',
    mapTitle: 'Mapa de Mar Azul',
  },
  reserva: { title: 'Reserva la teva taula', text: "Els caps de setmana s'omple. Millor reservar.", submit: 'Demanar taula' },
  footer: 'Mar Azul, cuina peruana a Collblanc',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
