import { createI18n } from '../_kit';

const es = {
  nav: { servicios: 'Servicios', taller: 'El taller', visita: 'Dónde', cita: 'Pedir cita' },
  hero: {
    title: 'Talleres Ronda',
    lead: 'Taller mecánico de barrio en la Ronda de la Torrassa. Reparaciones, revisiones y recambios, con presupuesto antes de tocar nada.',
    cita: 'Pedir cita o presupuesto',
    call: 'Llamar al 934 228 018',
    sceneAlt: 'Pistón y biela de un motor bombeando sobre un plano técnico',
  },
  servicios: {
    title: 'Despiece de servicios',
    intro: 'Cada pieza, un servicio. Lista de ejemplo para enseñar el diseño.',
    items: [
      { n: 'Revisión y mantenimiento', d: 'Aceite, filtros, niveles y revisión según el libro del coche.', dim: '15.000 km' },
      { n: 'Pre-ITV', d: 'Repasamos luces, frenos y emisiones antes de la inspección.', dim: '1 visita' },
      { n: 'Frenos y embrague', d: 'Pastillas, discos y kits de embrague.', dim: 'Ø 280 mm' },
      { n: 'Diagnosis', d: 'Lectura de averías y testigos del cuadro.', dim: 'OBD' },
      { n: 'Recambios', d: 'Piezas originales o equivalentes, tú eliges.', dim: 'Ref.' },
    ],
  },
  taller: { title: 'El taller', text: 'Un bajo en la Ronda de la Torrassa con elevador, banco de trabajo y mecánicos que te explican qué tiene tu coche.', photos: ['Elevador', 'Banco de trabajo', 'Recambios'] },
  resenas: {
    title: 'Clientes',
    items: [
      { t: 'Me llamaron antes de cambiar nada y el precio fue el del presupuesto.', w: 'Cliente de La Torrassa' },
      { t: 'Pasé la ITV a la primera después de su revisión.', w: 'Conductor de una furgoneta' },
    ],
  },
  visita: {
    title: 'Dónde',
    address: 'Ronda de la Torrassa, 39, bajos, 08903 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phoneNote: 'Teléfono que figura en guías comerciales; conviene confirmarlo.',
    hours: 'Horario',
    mapTitle: 'Mapa de Talleres Ronda',
  },
  cita: { title: 'Pide cita o presupuesto', text: 'Marca, modelo y qué le pasa. Te llamamos con el presupuesto.', submit: 'Enviar', service: 'Servicio' },
  footer: 'Talleres Ronda, La Torrassa',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { servicios: 'Serveis', taller: 'El taller', visita: 'On', cita: 'Demanar cita' },
  hero: {
    title: 'Talleres Ronda',
    lead: 'Taller mecànic de barri a la Ronda de la Torrassa. Reparacions, revisions i recanvis, amb pressupost abans de tocar res.',
    cita: 'Demanar cita o pressupost',
    call: 'Trucar al 934 228 018',
    sceneAlt: "Pistó i biela d'un motor bombant sobre un plànol tècnic",
  },
  servicios: {
    title: 'Especejament de serveis',
    intro: "Cada peça, un servei. Llista d'exemple per ensenyar el disseny.",
    items: [
      { n: 'Revisió i manteniment', d: 'Oli, filtres, nivells i revisió segons el llibre del cotxe.', dim: '15.000 km' },
      { n: 'Pre-ITV', d: 'Repassem llums, frens i emissions abans de la inspecció.', dim: '1 visita' },
      { n: 'Frens i embragatge', d: "Pastilles, discos i kits d'embragatge.", dim: 'Ø 280 mm' },
      { n: 'Diagnosi', d: "Lectura d'avaries i testimonis del quadre.", dim: 'OBD' },
      { n: 'Recanvis', d: 'Peces originals o equivalents, tu tries.', dim: 'Ref.' },
    ],
  },
  taller: { title: 'El taller', text: 'Un baix a la Ronda de la Torrassa amb elevador, banc de treball i mecànics que t’expliquen què té el teu cotxe.', photos: ['Elevador', 'Banc de treball', 'Recanvis'] },
  resenas: {
    title: 'Clients',
    items: [
      { t: 'Em van trucar abans de canviar res i el preu va ser el del pressupost.', w: 'Client de la Torrassa' },
      { t: "Vaig passar l'ITV a la primera després de la seva revisió.", w: "Conductor d'una furgoneta" },
    ],
  },
  visita: {
    title: 'On',
    address: 'Ronda de la Torrassa, 39, baixos, 08903 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phoneNote: 'Telèfon que figura en guies comercials; convé confirmar-lo.',
    hours: 'Horari',
    mapTitle: 'Mapa de Talleres Ronda',
  },
  cita: { title: 'Demana cita o pressupost', text: 'Marca, model i què li passa. Et truquem amb el pressupost.', submit: 'Enviar', service: 'Servei' },
  footer: 'Talleres Ronda, la Torrassa',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
