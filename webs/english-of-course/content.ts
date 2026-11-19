import { createI18n } from '../_kit';

const es = {
  nav: { cursos: 'Cursos', sedes: 'Sedes', cambridge: 'Cambridge', matricula: 'Matrícula' },
  hero: {
    title: 'Inglés que se usa, en dos sedes de L’Hospitalet',
    lead: 'English Of Course! es centro preparador de exámenes Cambridge con clases para niños, adolescentes y adultos en La Florida y en Collblanc–La Torrassa.',
    cta: 'Reservar prueba de nivel',
    call: 'Llamar',
    sceneAlt: 'Globo terráqueo de puntos con bocadillos EN, ES y CA girando a su alrededor',
  },
  cursos: {
    title: 'Cursos',
    items: [
      { who: 'Kids', age: 'De 4 a 11 años', d: 'Juego, canciones y mucha conversación para perder el miedo.' },
      { who: 'Teens', age: 'De 12 a 17 años', d: 'Refuerzo del colegio y preparación de exámenes oficiales.' },
      { who: 'Adults', age: 'Desde 18 años', d: 'Inglés para el trabajo, para viajar o para recuperar lo olvidado.' },
    ],
    note: 'Franjas de edad de ejemplo; la academia define sus grupos.',
  },
  sedes: {
    title: 'Dos sedes, una línea',
    hint: 'Elige la que te quede más cerca.',
    stops: [
      { name: 'La Florida', addr: 'Av. del Masnou, 76, 08905', phone: '931 459 472 y 670 831 993', metro: 'Metro Florida (L1)' },
      { name: 'Collblanc–La Torrassa', addr: 'C/ del Doctor Martí i Julià, 94, 08903', phone: '654 122 816', metro: 'Metro Collblanc (L5)' },
    ],
  },
  cambridge: {
    title: 'Centro preparador Cambridge',
    text: 'Preparamos los exámenes oficiales de Cambridge, del nivel inicial al avanzado, con simulacros en condiciones reales.',
    levels: ['A2 Key', 'B1 Preliminary', 'B2 First', 'C1 Advanced', 'C2 Proficiency'],
  },
  galeria: { title: 'Las aulas', photos: ['Aula de Kids', 'Simulacro de examen', 'Biblioteca de lectura'] },
  resenas: {
    title: 'Students say',
    items: [
      { t: 'Aprobé el First a la primera. Los simulacros me quitaron los nervios.', w: 'Alumna de B2' },
      { t: 'Mi hijo va contento y ya se atreve a hablar en inglés en vacaciones.', w: 'Padre de un alumno de 9 años' },
    ],
  },
  contacto: { email: 'Correo', hours: 'Horario', mapTitle: 'Mapa de English Of Course!' },
  matricula: { title: 'Prueba de nivel', text: 'Te decimos qué grupo te encaja y te reservamos plaza.', submit: 'Reservar prueba', sede: 'Sede', level: 'Para quién' , levels: ['Niño o niña', 'Adolescente', 'Adulto'] },
  footer: 'English Of Course!, academia de inglés',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { cursos: 'Cursos', sedes: 'Seus', cambridge: 'Cambridge', matricula: 'Matrícula' },
  hero: {
    title: "Anglès que es fa servir, en dues seus de L'Hospitalet",
    lead: "English Of Course! és centre preparador d'exàmens Cambridge amb classes per a nens, adolescents i adults a la Florida i a Collblanc–la Torrassa.",
    cta: 'Reservar prova de nivell',
    call: 'Trucar',
    sceneAlt: 'Globus terraqüi de punts amb bafarades EN, ES i CA girant al seu voltant',
  },
  cursos: {
    title: 'Cursos',
    items: [
      { who: 'Kids', age: 'De 4 a 11 anys', d: 'Joc, cançons i molta conversa per perdre la por.' },
      { who: 'Teens', age: 'De 12 a 17 anys', d: "Reforç de l'escola i preparació d'exàmens oficials." },
      { who: 'Adults', age: 'Des de 18 anys', d: 'Anglès per a la feina, per viatjar o per recuperar el que has oblidat.' },
    ],
    note: "Franges d'edat d'exemple; l'acadèmia defineix els seus grups.",
  },
  sedes: {
    title: 'Dues seus, una línia',
    hint: 'Tria la que et quedi més a prop.',
    stops: [
      { name: 'La Florida', addr: 'Av. del Masnou, 76, 08905', phone: '931 459 472 i 670 831 993', metro: 'Metro Florida (L1)' },
      { name: 'Collblanc–la Torrassa', addr: 'C/ del Doctor Martí i Julià, 94, 08903', phone: '654 122 816', metro: 'Metro Collblanc (L5)' },
    ],
  },
  cambridge: {
    title: 'Centre preparador Cambridge',
    text: 'Preparem els exàmens oficials de Cambridge, del nivell inicial a l’avançat, amb simulacres en condicions reals.',
    levels: ['A2 Key', 'B1 Preliminary', 'B2 First', 'C1 Advanced', 'C2 Proficiency'],
  },
  galeria: { title: 'Les aules', photos: ['Aula de Kids', "Simulacre d'examen", 'Biblioteca de lectura'] },
  resenas: {
    title: 'Students say',
    items: [
      { t: 'Vaig aprovar el First a la primera. Els simulacres em van treure els nervis.', w: 'Alumna de B2' },
      { t: "El meu fill hi va content i ja s'atreveix a parlar en anglès de vacances.", w: "Pare d'un alumne de 9 anys" },
    ],
  },
  contacto: { email: 'Correu', hours: 'Horari', mapTitle: 'Mapa d’English Of Course!' },
  matricula: { title: 'Prova de nivell', text: "Et diem quin grup t'encaixa i et reservem plaça.", submit: 'Reservar prova', sede: 'Seu', level: 'Per a qui', levels: ['Nen o nena', 'Adolescent', 'Adult'] },
  footer: "English Of Course!, acadèmia d'anglès",
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
