import { createI18n } from '../_kit';

const es = {
  nav: { clases: 'Clases', como: 'Cómo aprendemos', visita: 'Dónde', matricula: 'Clase de prueba' },
  hero: {
    title: 'Inglés jugando, en Bellvitge',
    lead: 'Funnyschool: clases 100 % en inglés para niños y niñas. Aprenden hablando, cantando y moviéndose, sin darse cuenta.',
    cta: 'Pedir clase de prueba',
    whatsapp: 'Escribir por WhatsApp',
    sceneAlt: 'Bloques de letras A, B y C que caen, rebotan y se pueden empujar con el cursor',
    push: 'Empuja los bloques',
  },
  clases: {
    title: 'Grupos por edades',
    groups: [
      { age: '3–5', name: 'Little ones', d: 'Canciones, cuentos y juego para los primeros contactos con el inglés.', tone: 'sky' },
      { age: '6–9', name: 'Kids', d: 'Vocabulario, lectura y mucha conversación en grupo.', tone: 'grass' },
      { age: '10–12', name: 'Juniors', d: 'Gramática con sentido y preparación de exámenes.', tone: 'red' },
    ],
    note: 'Grupos de ejemplo para enseñar el diseño. Los cursos reales los define la academia.',
  },
  como: {
    title: 'Cómo aprendemos',
    points: [
      { t: 'Only English', d: 'Desde el primer día la clase es en inglés. Se entiende por el contexto.' },
      { t: 'Grupos pequeños', d: 'Todos hablan en cada sesión.' },
      { t: 'Familias informadas', d: 'Os contamos qué hemos trabajado y cómo practicar en casa.' },
    ],
  },
  galeria: { title: 'El aula', photos: ['Rincón de lectura', 'Clase de canciones', 'Material de la academia'] },
  resenas: {
    title: 'Lo que cuentan las familias',
    items: [
      { t: 'Mi hijo canta en inglés por casa y ni se da cuenta de que está aprendiendo.', w: 'Madre de un alumno de 6 años' },
      { t: 'Grupos pequeños y profes con mucha paciencia.', w: 'Padre de Bellvitge' },
      { t: 'Ha perdido la vergüenza a hablar. Para nosotros, lo más importante.', w: 'Familia de una alumna de 10 años' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'Av. Mare de Déu de Bellvitge, 40, altillo C, 08907 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    email: 'Correo',
    hours: 'Horario',
    mapTitle: 'Mapa de Funnyschool',
  },
  prueba: { title: 'Ven a una clase de prueba', text: 'Dinos la edad y te proponemos el grupo que encaja.', submit: 'Pedir clase de prueba', age: 'Edad', ages: ['3 a 5 años', '6 a 9 años', '10 a 12 años'] },
  footer: 'Funnyschool, academia de inglés en Bellvitge',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { clases: 'Classes', como: 'Com aprenem', visita: 'On', matricula: 'Classe de prova' },
  hero: {
    title: 'Anglès jugant, a Bellvitge',
    lead: 'Funnyschool: classes 100 % en anglès per a nens i nenes. Aprenen parlant, cantant i movent-se, sense adonar-se’n.',
    cta: 'Demanar classe de prova',
    whatsapp: 'Escriure per WhatsApp',
    sceneAlt: 'Blocs de lletres A, B i C que cauen, reboten i es poden empènyer amb el cursor',
    push: 'Empeny els blocs',
  },
  clases: {
    title: 'Grups per edats',
    groups: [
      { age: '3–5', name: 'Little ones', d: "Cançons, contes i joc per als primers contactes amb l'anglès.", tone: 'sky' },
      { age: '6–9', name: 'Kids', d: 'Vocabulari, lectura i molta conversa en grup.', tone: 'grass' },
      { age: '10–12', name: 'Juniors', d: "Gramàtica amb sentit i preparació d'exàmens.", tone: 'red' },
    ],
    note: "Grups d'exemple per ensenyar el disseny. Els cursos reals els defineix l'acadèmia.",
  },
  como: {
    title: 'Com aprenem',
    points: [
      { t: 'Only English', d: "Des del primer dia la classe és en anglès. S'entén pel context." },
      { t: 'Grups petits', d: 'Tothom parla a cada sessió.' },
      { t: 'Famílies informades', d: 'Us expliquem què hem treballat i com practicar a casa.' },
    ],
  },
  galeria: { title: "L'aula", photos: ['Racó de lectura', 'Classe de cançons', "Material de l'acadèmia"] },
  resenas: {
    title: 'El que expliquen les famílies',
    items: [
      { t: "El meu fill canta en anglès per casa i ni s'adona que està aprenent.", w: "Mare d'un alumne de 6 anys" },
      { t: 'Grups petits i profes amb molta paciència.', w: 'Pare de Bellvitge' },
      { t: 'Ha perdut la vergonya de parlar. Per a nosaltres, el més important.', w: "Família d'una alumna de 10 anys" },
    ],
  },
  visita: {
    title: 'On som',
    address: 'Av. Mare de Déu de Bellvitge, 40, altell C, 08907 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    email: 'Correu',
    hours: 'Horari',
    mapTitle: 'Mapa de Funnyschool',
  },
  prueba: { title: 'Vine a una classe de prova', text: "Digues-nos l'edat i et proposem el grup que encaixa.", submit: 'Demanar classe de prova', age: 'Edat', ages: ['De 3 a 5 anys', 'De 6 a 9 anys', 'De 10 a 12 anys'] },
  footer: "Funnyschool, acadèmia d'anglès a Bellvitge",
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
