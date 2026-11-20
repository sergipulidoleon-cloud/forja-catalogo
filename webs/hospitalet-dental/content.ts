import { createI18n } from '../_kit';

const es = {
  nav: { implantes: 'Implantes', tratamientos: 'Tratamientos', visita: 'Clínica', cita: 'Primera visita' },
  hero: {
    title: 'Odontología precisa, sin prisas, en el centro de L’Hospitalet',
    lead: 'Hospitalet Dental, en la calle Castillejos. Diagnóstico claro, presupuesto cerrado y el tiempo necesario para cada paciente.',
    cita: 'Pedir primera visita',
    whatsapp: 'WhatsApp',
    sceneAlt: 'Implante dental de titanio con rosca en espiral; se puede girar arrastrando',
  },
  implante: {
    title: 'Un implante, pieza a pieza',
    intro: 'Así se repone un diente perdido. Haz scroll en la parte superior para ver el despiece.',
    steps: [
      { n: 'El implante', d: 'Un tornillo de titanio que se integra en el hueso y hace de raíz.' },
      { n: 'El pilar', d: 'La pieza que une el implante con el diente visible.' },
      { n: 'La corona', d: 'Cerámica a medida, con el color y la forma de tus dientes.' },
    ],
  },
  tratamientos: {
    title: 'Tratamientos',
    items: ['Implantología', 'Ortodoncia invisible', 'Estética y carillas', 'Periodoncia', 'Odontología general', 'Atención a mutuas'],
    note: 'Lista de ejemplo. La web actual de la clínica tiene una página dedicada a mutuas.',
  },
  galeria: { title: 'La clínica', photos: ['Recepción', 'Gabinete', 'Equipo clínico'] },
  resenas: {
    title: 'Pacientes',
    items: [
      { t: 'Me explicaron el implante con un modelo y un presupuesto por escrito. Cero sorpresas.', w: 'Paciente de implantología' },
      { t: 'Trato exquisito y puntualidad absoluta.', w: 'Paciente de ortodoncia' },
    ],
  },
  visita: {
    title: 'La clínica',
    address: 'C/ dels Castillejos, 10, 08901 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    mobile: 'Móvil y WhatsApp',
    email: 'Correo',
    hours: 'Horario',
    mapTitle: 'Mapa de Hospitalet Dental',
  },
  cita: { title: 'Primera visita', text: 'Revisión, diagnóstico y plan de tratamiento. Te llamamos para darte hora.', submit: 'Solicitar primera visita' },
  footer: 'Hospitalet Dental, calle Castillejos',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { implantes: 'Implants', tratamientos: 'Tractaments', visita: 'Clínica', cita: 'Primera visita' },
  hero: {
    title: 'Odontologia precisa, sense presses, al centre de L’Hospitalet',
    lead: 'Hospitalet Dental, al carrer Castillejos. Diagnòstic clar, pressupost tancat i el temps necessari per a cada pacient.',
    cita: 'Demanar primera visita',
    whatsapp: 'WhatsApp',
    sceneAlt: 'Implant dental de titani amb rosca en espiral; es pot girar arrossegant',
  },
  implante: {
    title: 'Un implant, peça a peça',
    intro: 'Així es reposa una dent perduda. Fes scroll a la part superior per veure l’especejament.',
    steps: [
      { n: "L'implant", d: "Un cargol de titani que s'integra a l'os i fa d'arrel." },
      { n: 'El pilar', d: "La peça que uneix l'implant amb la dent visible." },
      { n: 'La corona', d: 'Ceràmica a mida, amb el color i la forma de les teves dents.' },
    ],
  },
  tratamientos: {
    title: 'Tractaments',
    items: ['Implantologia', 'Ortodòncia invisible', 'Estètica i carilles', 'Periodòncia', 'Odontologia general', 'Atenció a mútues'],
    note: "Llista d'exemple. El web actual de la clínica té una pàgina dedicada a mútues.",
  },
  galeria: { title: 'La clínica', photos: ['Recepció', 'Gabinet', 'Equip clínic'] },
  resenas: {
    title: 'Pacients',
    items: [
      { t: "Em van explicar l'implant amb un model i un pressupost per escrit. Zero sorpreses.", w: "Pacient d'implantologia" },
      { t: 'Tracte exquisit i puntualitat absoluta.', w: "Pacient d'ortodòncia" },
    ],
  },
  visita: {
    title: 'La clínica',
    address: 'C/ dels Castillejos, 10, 08901 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    mobile: 'Mòbil i WhatsApp',
    email: 'Correu',
    hours: 'Horari',
    mapTitle: 'Mapa de Hospitalet Dental',
  },
  cita: { title: 'Primera visita', text: 'Revisió, diagnòstic i pla de tractament. Et truquem per donar-te hora.', submit: 'Sol·licitar primera visita' },
  footer: 'Hospitalet Dental, carrer Castillejos',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
