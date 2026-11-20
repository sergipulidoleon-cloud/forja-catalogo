import { createI18n } from '../_kit';

const es = {
  nav: { servicios: 'Servicios', local: 'El local', visita: 'Dónde', cita: 'Coger cita' },
  hero: {
    title: 'Barber Shop Hospitalet',
    sub: 'Barbería de hombres en la calle Santa Eulàlia',
    lead: 'Corte, barba y afeitado a navaja con toalla caliente. Entras, te sientas, sales nuevo.',
    cita: 'Coger cita',
    whatsapp: 'WhatsApp',
    sceneAlt: 'Sillón de barbero clásico de cuero capitoné y metal; se puede girar arrastrando',
  },
  servicios: {
    title: 'La lista del espejo',
    groups: [
      { name: 'Pelo', items: ['Corte clásico', 'Degradado (fade)', 'Corte a tijera', 'Corte infantil'] },
      { name: 'Barba', items: ['Arreglo de barba', 'Perfilado con navaja', 'Barba y corte'] },
      { name: 'Ritual', items: ['Afeitado con toalla caliente', 'Limpieza facial', 'Cejas'] },
    ],
  },
  local: { title: 'El sillón te espera', text: 'Sillones clásicos, navaja, espuma caliente y la conversación de siempre. Sin prisa aunque haya cola.', photos: ['El sillón', 'Navajas y brochas', 'Un degradado recién hecho'] },
  resenas: {
    title: 'Clientes',
    items: [
      { t: 'El mejor degradado que me han hecho en L’Hospitalet. Puntuales con la cita.', w: 'Cliente desde hace dos años' },
      { t: 'El afeitado con toalla caliente es otro nivel. Salí como nuevo.', w: 'Cliente de barba' },
      { t: 'Llevo a mi hijo y a los dos nos dejan perfectos.', w: 'Padre del barrio' },
    ],
  },
  visita: {
    title: 'Dónde',
    address: 'C/ de Santa Eulàlia, 158, 08902 L’Hospitalet de Llobregat',
    metro: 'Metro Santa Eulàlia (L1)',
    phone: 'Teléfono',
    hours: 'Horario',
    mapTitle: 'Mapa de Barber Shop Hospitalet',
  },
  cita: { title: 'Coge tu cita', text: 'Elige servicio y día. Te confirmamos la hora por WhatsApp.', submit: 'Pedir cita', service: 'Servicio' },
  footer: 'Barber Shop Hospitalet, Santa Eulàlia',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { servicios: 'Serveis', local: 'El local', visita: 'On', cita: 'Agafar cita' },
  hero: {
    title: 'Barber Shop Hospitalet',
    sub: 'Barberia d’homes al carrer de Santa Eulàlia',
    lead: 'Tall, barba i afaitat a navalla amb tovallola calenta. Entres, seus, surts nou.',
    cita: 'Agafar cita',
    whatsapp: 'WhatsApp',
    sceneAlt: 'Cadira de barber clàssica de cuir capitonat i metall; es pot girar arrossegant',
  },
  servicios: {
    title: 'La llista del mirall',
    groups: [
      { name: 'Cabell', items: ['Tall clàssic', 'Degradat (fade)', 'Tall a tisora', 'Tall infantil'] },
      { name: 'Barba', items: ['Arranjament de barba', 'Perfilat amb navalla', 'Barba i tall'] },
      { name: 'Ritual', items: ['Afaitat amb tovallola calenta', 'Neteja facial', 'Celles'] },
    ],
  },
  local: { title: 'La cadira t’espera', text: 'Cadires clàssiques, navalla, escuma calenta i la conversa de sempre. Sense pressa encara que hi hagi cua.', photos: ['La cadira', 'Navalles i brotxes', 'Un degradat acabat de fer'] },
  resenas: {
    title: 'Clients',
    items: [
      { t: 'El millor degradat que m’han fet a L’Hospitalet. Puntuals amb la cita.', w: 'Client des de fa dos anys' },
      { t: "L'afaitat amb tovallola calenta és un altre nivell. Vaig sortir com nou.", w: 'Client de barba' },
      { t: 'Hi porto el meu fill i ens deixen perfectes a tots dos.', w: 'Pare del barri' },
    ],
  },
  visita: {
    title: 'On',
    address: 'C/ de Santa Eulàlia, 158, 08902 L’Hospitalet de Llobregat',
    metro: 'Metro Santa Eulàlia (L1)',
    phone: 'Telèfon',
    hours: 'Horari',
    mapTitle: 'Mapa de Barber Shop Hospitalet',
  },
  cita: { title: 'Agafa la teva cita', text: "Tria servei i dia. T'ho confirmem per WhatsApp.", submit: 'Demanar cita', service: 'Servei' },
  footer: 'Barber Shop Hospitalet, Santa Eulàlia',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
