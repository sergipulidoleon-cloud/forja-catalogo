import { createI18n } from '../_kit';

const es = {
  nav: { tratamientos: 'Tratamientos', peques: 'Para peques', visita: 'Dónde estamos', cita: 'Pedir cita' },
  hero: {
    title: 'Sonrisas de toda la familia, en Santa Eulàlia',
    lead: 'Clínica Dental P&P, de la Dra. Mireia Pato. Más de diez años cuidando dientes de niños, padres y abuelos en la calle Enric Morera.',
    cita: 'Pedir cita',
    llamar: 'Llamar',
    sceneAlt: 'Dentadura completa escaneada en 3D, arcada superior e inferior; se puede girar arrastrando',
  },
  tratamientos: {
    title: 'Lo que hacemos',
    items: [
      { n: 'Odontopediatría', d: 'Primeras visitas sin miedo, selladores y revisiones para los más pequeños.' },
      { n: 'Ortodoncia', d: 'Brackets y alineadores para niños y adultos, con seguimiento cercano.' },
      { n: 'Periodoncia', d: 'Encías sanas: limpiezas profundas y control.' },
      { n: 'Implantes', d: 'Reponer piezas con un plan claro y por escrito.' },
    ],
    source: 'Especialidades que figuran en los directorios sanitarios de la clínica.',
  },
  peques: {
    title: 'La primera visita, sin miedo',
    steps: [
      { n: 'Conocemos la consulta', d: 'Antes de mirar dientes, se sube al sillón y lo mueve.' },
      { n: 'Contamos los dientes', d: 'Con espejo pequeño y explicando cada cosa.' },
      { n: 'Premio y consejos', d: 'Para casa: cepillado, horarios y dulces.' },
    ],
  },
  galeria: { title: 'La clínica', photos: ['Sala de espera con rincón infantil', 'El gabinete', 'Nuestro equipo'] },
  resenas: {
    title: 'Familias que vienen',
    items: [
      { t: 'Mi hija salió contentísima de su primera visita. Paciencia infinita.', w: 'Madre de una paciente de 5 años' },
      { t: 'Me pusieron la ortodoncia con 40 años y me lo explicaron todo muy claro.', w: 'Paciente de ortodoncia' },
      { t: 'Cercanos y de confianza. Venimos tres generaciones.', w: 'Familia del barrio' },
    ],
  },
  visita: {
    title: 'Dónde estamos',
    address: 'C/ d’Enric Morera, 47, 08902 L’Hospitalet de Llobregat',
    phone: 'Teléfono',
    phoneNote: 'Teléfono que aparece en directorios sanitarios; conviene confirmarlo.',
    hours: 'Horario',
    mapTitle: 'Mapa de Clínica Dental P&P',
  },
  cita: { title: 'Pide tu cita', text: 'Cuéntanos quién viene y te llamamos para cuadrar el día.', submit: 'Solicitar cita', who: '¿Para quién es?', whoOptions: ['Para un niño o niña', 'Para mí', 'Para un familiar mayor'] },
  footer: 'Clínica Dental P&P, Dra. Mireia Pato',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { tratamientos: 'Tractaments', peques: 'Per als petits', visita: 'On som', cita: 'Demanar cita' },
  hero: {
    title: 'Somriures de tota la família, a Santa Eulàlia',
    lead: 'Clínica Dental P&P, de la Dra. Mireia Pato. Més de deu anys cuidant dents de nens, pares i avis al carrer Enric Morera.',
    cita: 'Demanar cita',
    llamar: 'Trucar',
    sceneAlt: 'Dentadura completa escanejada en 3D, arcada superior i inferior; es pot girar arrossegant',
  },
  tratamientos: {
    title: 'El que fem',
    items: [
      { n: 'Odontopediatria', d: 'Primeres visites sense por, segelladors i revisions per als més petits.' },
      { n: 'Ortodòncia', d: 'Brackets i alineadors per a nens i adults, amb seguiment proper.' },
      { n: 'Periodòncia', d: 'Genives sanes: netejes profundes i control.' },
      { n: 'Implants', d: 'Reposar peces amb un pla clar i per escrit.' },
    ],
    source: 'Especialitats que figuren als directoris sanitaris de la clínica.',
  },
  peques: {
    title: 'La primera visita, sense por',
    steps: [
      { n: 'Coneixem la consulta', d: 'Abans de mirar dents, puja a la cadira i la mou.' },
      { n: 'Comptem les dents', d: 'Amb un mirall petit i explicant cada cosa.' },
      { n: 'Premi i consells', d: 'Per a casa: raspallat, horaris i llaminadures.' },
    ],
  },
  galeria: { title: 'La clínica', photos: ["Sala d'espera amb racó infantil", 'El gabinet', 'El nostre equip'] },
  resenas: {
    title: 'Famílies que vénen',
    items: [
      { t: 'La meva filla va sortir contentíssima de la primera visita. Paciència infinita.', w: "Mare d'una pacient de 5 anys" },
      { t: "Em van posar l'ortodòncia amb 40 anys i m'ho van explicar tot molt clar.", w: "Pacient d'ortodòncia" },
      { t: 'Propers i de confiança. Hi venim tres generacions.', w: 'Família del barri' },
    ],
  },
  visita: {
    title: 'On som',
    address: 'C/ d’Enric Morera, 47, 08902 L’Hospitalet de Llobregat',
    phone: 'Telèfon',
    phoneNote: 'Telèfon que apareix en directoris sanitaris; convé confirmar-lo.',
    hours: 'Horari',
    mapTitle: 'Mapa de Clínica Dental P&P',
  },
  cita: { title: 'Demana la teva cita', text: "Explica'ns qui ve i et truquem per quadrar el dia.", submit: 'Sol·licitar cita', who: 'Per a qui és?', whoOptions: ['Per a un nen o nena', 'Per a mi', 'Per a un familiar gran'] },
  footer: 'Clínica Dental P&P, Dra. Mireia Pato',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
