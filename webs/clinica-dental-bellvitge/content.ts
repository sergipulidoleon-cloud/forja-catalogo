import { createI18n } from '../_kit';

const es = {
  nav: { treatments: 'Tratamientos', clinic: 'La clínica', hours: 'Horario', contact: 'Contacto', book: 'Pedir cita' },
  hero: {
    title: 'Tu dentista en Bellvitge, a la vuelta de la esquina',
    lead: 'Revisiones, encías y estética dental en la Avinguda Mare de Déu de Bellvitge. Te explicamos cada paso antes de empezar.',
    book: 'Pedir cita',
    whatsapp: 'Escribir por WhatsApp',
    sceneAlt: 'Molar de cerámica translúcida girando lentamente',
  },
  treatments: {
    title: 'Qué tratamos',
    intro: 'Pasa el cursor o toca un tratamiento para ver en qué piezas trabajamos.',
    items: [
      { id: 'perio', name: 'Periodoncia', text: 'Tratamiento de encías sangrantes, retracción y movilidad. Tiene página propia en la web actual de la clínica.', teeth: [3, 4, 5, 11, 12, 13] },
      { id: 'revision', name: 'Revisión y limpieza', text: 'Exploración completa, radiografía si hace falta y limpieza profesional.', teeth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { id: 'implantes', name: 'Implantes', text: 'Reposición de piezas perdidas con un plan por escrito y presupuesto cerrado.', teeth: [1, 14] },
      { id: 'estetica', name: 'Estética dental', text: 'Blanqueamiento y carillas para los dientes que se ven al sonreír.', teeth: [6, 7, 8, 9] },
      { id: 'urgencias', name: 'Urgencias', text: 'Dolor, rotura o inflamación: te damos hueco el mismo día si es posible.', teeth: [2] },
    ],
  },
  clinic: {
    title: 'La clínica',
    text: 'Un espacio pensado para que vengas tranquilo: gabinetes luminosos, esterilización a la vista y tiempo para resolver dudas.',
    photos: ['Recepción y sala de espera', 'Gabinete de tratamiento', 'Equipo de la clínica'],
  },
  reviews: {
    title: 'Lo que cuentan los pacientes',
    items: [
      { text: 'Me explicaron el tratamiento de encías con calma y sin prisas. Salí sabiendo exactamente qué me iban a hacer.', who: 'Paciente de periodoncia' },
      { text: 'Fui con dolor un martes y me atendieron esa misma tarde. Muy cerca de casa.', who: 'Vecina de Bellvitge' },
      { text: 'Llevo a toda la familia. Puntuales y con el presupuesto claro desde el principio.', who: 'Paciente desde hace años' },
    ],
  },
  hours: {
    title: 'Horario',
    rows: [
      { day: 'Lunes a viernes', time: '10:00 a 14:00 y 15:00 a 19:00' },
      { day: 'Sábado y domingo', time: 'Cerrado' },
    ],
  },
  contact: {
    title: 'Ven a vernos',
    address: 'Av. Mare de Déu de Bellvitge, 68, 08907 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    email: 'Correo',
    whatsapp: 'WhatsApp',
    mapTitle: 'Mapa de la Clínica Dental Bellvitge',
  },
  book: {
    title: 'Pide tu cita',
    text: 'Déjanos tu nombre y teléfono y te llamamos para buscar hueco.',
    submit: 'Solicitar cita',
    reason: 'Motivo',
    reasons: ['Revisión', 'Encías', 'Dolor o urgencia', 'Estética', 'Otro'],
  },
  footer: { rights: 'Clínica Dental Bellvitge' },
};

type Dict = typeof es;

const ca: Dict = {
  nav: { treatments: 'Tractaments', clinic: 'La clínica', hours: 'Horari', contact: 'Contacte', book: 'Demanar cita' },
  hero: {
    title: 'El teu dentista a Bellvitge, a tocar de casa',
    lead: 'Revisions, genives i estètica dental a l’Avinguda Mare de Déu de Bellvitge. T’expliquem cada pas abans de començar.',
    book: 'Demanar cita',
    whatsapp: 'Escriure per WhatsApp',
    sceneAlt: 'Molar de ceràmica translúcida girant lentament',
  },
  treatments: {
    title: 'Què tractem',
    intro: 'Passa el cursor o toca un tractament per veure en quines peces treballem.',
    items: [
      { id: 'perio', name: 'Periodòncia', text: 'Tractament de genives que sagnen, retracció i mobilitat. Té pàgina pròpia al web actual de la clínica.', teeth: [3, 4, 5, 11, 12, 13] },
      { id: 'revision', name: 'Revisió i neteja', text: 'Exploració completa, radiografia si cal i neteja professional.', teeth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { id: 'implantes', name: 'Implants', text: 'Reposició de peces perdudes amb un pla per escrit i pressupost tancat.', teeth: [1, 14] },
      { id: 'estetica', name: 'Estètica dental', text: 'Blanqueig i carilles per a les dents que es veuen en somriure.', teeth: [6, 7, 8, 9] },
      { id: 'urgencias', name: 'Urgències', text: 'Dolor, trencament o inflamació: et fem lloc el mateix dia si és possible.', teeth: [2] },
    ],
  },
  clinic: {
    title: 'La clínica',
    text: 'Un espai pensat perquè vinguis tranquil: gabinets lluminosos, esterilització a la vista i temps per resoldre dubtes.',
    photos: ['Recepció i sala d’espera', 'Gabinet de tractament', 'Equip de la clínica'],
  },
  reviews: {
    title: 'El que expliquen els pacients',
    items: [
      { text: 'Em van explicar el tractament de genives amb calma i sense presses. Vaig sortir sabent exactament què em farien.', who: 'Pacient de periodòncia' },
      { text: 'Hi vaig anar amb dolor un dimarts i em van atendre aquella mateixa tarda. Molt a prop de casa.', who: 'Veïna de Bellvitge' },
      { text: 'Hi porto tota la família. Puntuals i amb el pressupost clar des del principi.', who: 'Pacient des de fa anys' },
    ],
  },
  hours: {
    title: 'Horari',
    rows: [
      { day: 'De dilluns a divendres', time: '10:00 a 14:00 i 15:00 a 19:00' },
      { day: 'Dissabte i diumenge', time: 'Tancat' },
    ],
  },
  contact: {
    title: 'Vine a veure’ns',
    address: 'Av. Mare de Déu de Bellvitge, 68, 08907 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    email: 'Correu',
    whatsapp: 'WhatsApp',
    mapTitle: 'Mapa de la Clínica Dental Bellvitge',
  },
  book: {
    title: 'Demana la teva cita',
    text: 'Deixa’ns el teu nom i telèfon i et truquem per buscar lloc.',
    submit: 'Sol·licitar cita',
    reason: 'Motiu',
    reasons: ['Revisió', 'Genives', 'Dolor o urgència', 'Estètica', 'Altres'],
  },
  footer: { rights: 'Clínica Dental Bellvitge' },
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
