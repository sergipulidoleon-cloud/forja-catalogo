import { createI18n } from '../_kit';

const es = {
  nav: { tratamientos: 'Tratamientos', claudia: 'Quién soy', visita: 'Dónde', cita: 'Reservar' },
  hero: {
    title: 'Ben Fi. Estética de proximidad en La Florida',
    lead: 'Tratamientos faciales, manicura y depilación en un centro pequeño, tranquilo y de confianza.',
    cita: 'Reservar tratamiento',
    whatsapp: 'Preguntar por WhatsApp',
    sceneAlt: 'Frasco cuentagotas de vidrio que refracta la luz y deja caer una gota',
  },
  tratamientos: {
    title: 'Tratamientos',
    items: [
      { n: 'Facial', d: 'Limpieza, hidratación y tratamientos según tu piel.', note: 'Piel' },
      { n: 'Manicura', d: 'Clásica o semipermanente, con cuidado de cutículas.', note: 'Manos' },
      { n: 'Pedicura', d: 'Cuidado completo de pies y uñas.', note: 'Pies' },
      { n: 'Depilación', d: 'Cera y técnicas suaves para pieles sensibles.', note: 'Cuerpo' },
    ],
    source: 'Faciales, manicura y depilación aparecen en su web actual; el resto es de ejemplo.',
  },
  claudia: {
    title: 'Un centro con nombre propio',
    text: 'Ben Fi lo abrió Claudia hace unos cuatro años, después de más de diez trabajando en otros centros. Aquí cada clienta tiene su ficha y su tiempo.',
    source: 'Historia según la página «Conócenos» de su web actual.',
    photos: ['La cabina', 'Rincón de manicura'],
  },
  resenas: {
    title: 'Clientas',
    items: [
      { t: 'Claudia tiene unas manos increíbles y siempre te explica qué le va mejor a tu piel.', w: 'Clienta de faciales' },
      { t: 'La manicura me dura semanas. Y el sitio es un remanso.', w: 'Clienta de La Florida' },
    ],
  },
  visita: {
    title: 'Dónde',
    address: 'Barrio de La Florida, L’Hospitalet de Llobregat',
    addressNote: 'Dirección exacta por confirmar con el centro.',
    hours: 'Horario',
    phone: 'Teléfono',
    phonePending: 'Por confirmar',
    mapTitle: 'Mapa de Ben Fi',
  },
  cita: { title: 'Reserva tu momento', text: 'Elige tratamiento y día; te confirmamos la hora.', submit: 'Reservar', service: 'Tratamiento' },
  footer: 'Ben Fi, estética en La Florida',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { tratamientos: 'Tractaments', claudia: 'Qui soc', visita: 'On', cita: 'Reservar' },
  hero: {
    title: 'Ben Fi. Estètica de proximitat a la Florida',
    lead: 'Tractaments facials, manicura i depilació en un centre petit, tranquil i de confiança.',
    cita: 'Reservar tractament',
    whatsapp: 'Preguntar per WhatsApp',
    sceneAlt: 'Flascó comptagotes de vidre que refracta la llum i deixa caure una gota',
  },
  tratamientos: {
    title: 'Tractaments',
    items: [
      { n: 'Facial', d: 'Neteja, hidratació i tractaments segons la teva pell.', note: 'Pell' },
      { n: 'Manicura', d: 'Clàssica o semipermanent, amb cura de cutícules.', note: 'Mans' },
      { n: 'Pedicura', d: 'Cura completa de peus i ungles.', note: 'Peus' },
      { n: 'Depilació', d: 'Cera i tècniques suaus per a pells sensibles.', note: 'Cos' },
    ],
    source: "Facials, manicura i depilació apareixen al seu web actual; la resta és d'exemple.",
  },
  claudia: {
    title: 'Un centre amb nom propi',
    text: "Ben Fi el va obrir la Claudia fa uns quatre anys, després de més de deu treballant en altres centres. Aquí cada clienta té la seva fitxa i el seu temps.",
    source: 'Història segons la pàgina «Coneix-nos» del seu web actual.',
    photos: ['La cabina', 'Racó de manicura'],
  },
  resenas: {
    title: 'Clientes',
    items: [
      { t: "La Claudia té unes mans increïbles i sempre t'explica què li va millor a la teva pell.", w: 'Clienta de facials' },
      { t: 'La manicura em dura setmanes. I el lloc és un oasi.', w: 'Clienta de la Florida' },
    ],
  },
  visita: {
    title: 'On',
    address: 'Barri de la Florida, L’Hospitalet de Llobregat',
    addressNote: 'Adreça exacta per confirmar amb el centre.',
    hours: 'Horari',
    phone: 'Telèfon',
    phonePending: 'Per confirmar',
    mapTitle: 'Mapa de Ben Fi',
  },
  cita: { title: 'Reserva el teu moment', text: "Tria tractament i dia; et confirmem l'hora.", submit: 'Reservar', service: 'Tractament' },
  footer: 'Ben Fi, estètica a la Florida',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
