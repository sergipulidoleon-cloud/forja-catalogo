import { createI18n } from '../_kit';

const es = {
  nav: { servicios: 'Servicios', equipo: 'La clínica', visita: 'Dónde estamos', cita: 'Pedir cita' },
  bar: { urgent: '¿Es una urgencia? Llama antes de venir.', call: 'Llamar ahora' },
  hero: {
    title: 'Tu veterinario de barrio en Santa Eulàlia',
    lead: 'Cuidamos de perros, gatos y pequeños animales en la calle Àngel Guimerà. Cerca, con calma y explicándote todo.',
    cita: 'Pedir cita',
    whatsapp: 'Escribir por WhatsApp',
    sceneAlt: 'Perro low-poly que sigue el cursor con la mirada y mueve las orejas',
  },
  servicios: {
    title: 'Qué hacemos',
    items: [
      { n: 'Consulta y revisiones', d: 'Chequeo anual, peso y consejo de alimentación.' },
      { n: 'Vacunas y microchip', d: 'Calendario al día y pasaporte para viajar.' },
      { n: 'Desparasitación', d: 'Interna y externa, según su estilo de vida.' },
      { n: 'Cirugía', d: 'Esterilizaciones y cirugía de tejidos blandos.' },
      { n: 'Análisis', d: 'Resultados rápidos para decidir antes.' },
      { n: 'Peluquería', d: 'Baño y corte para que vuelva a casa nuevo.' },
    ],
  },
  clinica: { title: 'La clínica', text: 'Sala de espera separada para gatos, consulta tranquila y un equipo que conoce a sus pacientes por el nombre.', photos: ['Sala de espera', 'Consulta', 'Un paciente feliz'] },
  resenas: {
    title: 'Familias peludas',
    items: [
      { t: 'Trataron a nuestra gata mayor con una delicadeza enorme.', w: 'Familia con dos gatas' },
      { t: 'Nos atendieron un sábado por la mañana sin cita. Gracias.', w: 'Dueño de un beagle' },
      { t: 'Te explican las opciones y los precios antes de hacer nada.', w: 'Vecina de Santa Eulàlia' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'C/ d’Àngel Guimerà, 75, 08902 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phoneNote: 'Teléfono que aparece en directorios; conviene confirmarlo.',
    hours: 'Horario',
    mapTitle: 'Mapa del Centre Veterinari Santa Eulàlia',
  },
  cita: { title: 'Pide cita', text: 'Dinos quién viene y qué le pasa. Te llamamos para darte hora.', submit: 'Pedir cita', pet: 'Animal', pets: ['Perro', 'Gato', 'Conejo u otro pequeño', 'Ave', 'Otro'] },
  footer: 'Centre Veterinari Santa Eulàlia',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { servicios: 'Serveis', equipo: 'La clínica', visita: 'On som', cita: 'Demanar cita' },
  bar: { urgent: "És una urgència? Truca abans de venir.", call: 'Trucar ara' },
  hero: {
    title: 'El teu veterinari de barri a Santa Eulàlia',
    lead: "Cuidem gossos, gats i petits animals al carrer Àngel Guimerà. A prop, amb calma i explicant-t'ho tot.",
    cita: 'Demanar cita',
    whatsapp: 'Escriure per WhatsApp',
    sceneAlt: 'Gos low-poly que segueix el cursor amb la mirada i mou les orelles',
  },
  servicios: {
    title: 'Què fem',
    items: [
      { n: 'Consulta i revisions', d: "Revisió anual, pes i consell d'alimentació." },
      { n: 'Vacunes i microxip', d: 'Calendari al dia i passaport per viatjar.' },
      { n: 'Desparasitació', d: "Interna i externa, segons el seu estil de vida." },
      { n: 'Cirurgia', d: 'Esterilitzacions i cirurgia de teixits tous.' },
      { n: 'Anàlisis', d: 'Resultats ràpids per decidir abans.' },
      { n: 'Perruqueria', d: 'Bany i tall perquè torni a casa nou.' },
    ],
  },
  clinica: { title: 'La clínica', text: "Sala d'espera separada per a gats, consulta tranquil·la i un equip que coneix els pacients pel nom.", photos: ["Sala d'espera", 'Consulta', 'Un pacient feliç'] },
  resenas: {
    title: 'Famílies peludes',
    items: [
      { t: 'Van tractar la nostra gata gran amb una delicadesa enorme.', w: 'Família amb dues gates' },
      { t: 'Ens van atendre un dissabte al matí sense cita. Gràcies.', w: "Amo d'un beagle" },
      { t: "T'expliquen les opcions i els preus abans de fer res.", w: 'Veïna de Santa Eulàlia' },
    ],
  },
  visita: {
    title: 'On som',
    address: 'C/ d’Àngel Guimerà, 75, 08902 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phoneNote: 'Telèfon que apareix en directoris; convé confirmar-lo.',
    hours: 'Horari',
    mapTitle: 'Mapa del Centre Veterinari Santa Eulàlia',
  },
  cita: { title: 'Demana cita', text: "Digues-nos qui ve i què li passa. Et truquem per donar-te hora.", submit: 'Demanar cita', pet: 'Animal', pets: ['Gos', 'Gat', 'Conill o altre petit', 'Ocell', 'Altres'] },
  footer: 'Centre Veterinari Santa Eulàlia',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
