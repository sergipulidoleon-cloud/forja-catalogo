import { createI18n } from '../_kit';

const es = {
  nav: { zonas: 'Dónde duele', equipo: 'Equipo', visita: 'Centro', cita: 'Pedir cita' },
  hero: {
    title: 'Volver a moverte sin dolor',
    lead: 'FISAL, centro de fisioterapia y salud en la Rambla Marina de Bellvitge desde 2004. Fisioterapia, osteopatía, psicología, nutrición y entrenamiento bajo un mismo techo.',
    cita: 'Pedir cita',
    escribir: 'Escribir un correo',
    sceneAlt: 'Columna vertebral que se curva siguiendo el cursor',
  },
  zonas: {
    title: '¿Dónde te duele?',
    intro: 'Elige una zona y te contamos cómo la trabajamos.',
    items: [
      { id: 'cervical', n: 'Cervicales', d: 'Rigidez, cefaleas tensionales y dolor de cuello por postura.', y: 16 },
      { id: 'hombro', n: 'Hombro', d: 'Tendinopatías, hombro congelado y recuperación tras lesión.', y: 24 },
      { id: 'lumbar', n: 'Lumbar', d: 'Lumbalgias, ciática y dolor de espalda al estar sentado.', y: 44 },
      { id: 'rodilla', n: 'Rodilla', d: 'Lesiones deportivas, ligamentos y postoperatorios.', y: 72 },
      { id: 'tobillo', n: 'Tobillo', d: 'Esguinces y readaptación para volver a correr.', y: 90 },
    ],
    note: 'Ejemplos de tratamientos frecuentes en fisioterapia; el centro detalla los suyos.',
  },
  equipo: {
    title: 'Un equipo para todo el cuerpo',
    text: 'Tres fisioterapeutas y un psicólogo especializados, con un enfoque integral: tratar la lesión y lo que hay alrededor.',
    areas: ['Fisioterapia', 'Osteopatía', 'Psicología', 'Nutrición', 'Entrenamiento'],
    source: 'Datos del equipo y especialidades según la web actual de FISAL.',
    photos: ['Sala de tratamiento', 'Zona de ejercicio'],
  },
  resenas: {
    title: 'Pacientes',
    items: [
      { t: 'Llegué con una lumbalgia que no me dejaba dormir. En tres semanas, otra vida.', w: 'Paciente de 48 años' },
      { t: 'Me prepararon para volver a correr después del esguince, paso a paso.', w: 'Corredora popular' },
    ],
  },
  visita: {
    title: 'El centro',
    address: 'Rambla de la Marina, 187, 1.º 1.ª, L’Hospitalet de Llobregat',
    email: 'Correo',
    phone: 'Teléfono',
    phonePending: 'Por confirmar con el centro',
    hours: 'Horario',
    mapTitle: 'Mapa de FISAL',
  },
  cita: { title: 'Pide tu cita', text: 'Cuéntanos qué te pasa; te llamamos para la primera valoración.', submit: 'Pedir cita', area: 'Servicio' },
  footer: 'FISAL, fisioterapia y salud en Bellvitge',
};

type Dict = typeof es;

const ca: Dict = {
  nav: { zonas: 'On fa mal', equipo: 'Equip', visita: 'Centre', cita: 'Demanar cita' },
  hero: {
    title: 'Tornar a moure’t sense dolor',
    lead: 'FISAL, centre de fisioteràpia i salut a la Rambla Marina de Bellvitge des del 2004. Fisioteràpia, osteopatia, psicologia, nutrició i entrenament sota un mateix sostre.',
    cita: 'Demanar cita',
    escribir: 'Escriure un correu',
    sceneAlt: 'Columna vertebral que es corba seguint el cursor',
  },
  zonas: {
    title: 'On et fa mal?',
    intro: "Tria una zona i t'expliquem com la treballem.",
    items: [
      { id: 'cervical', n: 'Cervicals', d: 'Rigidesa, cefalees tensionals i dolor de coll per postura.', y: 16 },
      { id: 'hombro', n: 'Espatlla', d: 'Tendinopaties, espatlla congelada i recuperació després de lesió.', y: 24 },
      { id: 'lumbar', n: 'Lumbar', d: 'Lumbàlgies, ciàtica i mal d’esquena en estar assegut.', y: 44 },
      { id: 'rodilla', n: 'Genoll', d: 'Lesions esportives, lligaments i postoperatoris.', y: 72 },
      { id: 'tobillo', n: 'Turmell', d: 'Esquinços i readaptació per tornar a córrer.', y: 90 },
    ],
    note: "Exemples de tractaments freqüents en fisioteràpia; el centre detalla els seus.",
  },
  equipo: {
    title: 'Un equip per a tot el cos',
    text: 'Tres fisioterapeutes i un psicòleg especialitzats, amb un enfocament integral: tractar la lesió i el que hi ha al voltant.',
    areas: ['Fisioteràpia', 'Osteopatia', 'Psicologia', 'Nutrició', 'Entrenament'],
    source: "Dades de l'equip i especialitats segons el web actual de FISAL.",
    photos: ['Sala de tractament', "Zona d'exercici"],
  },
  resenas: {
    title: 'Pacients',
    items: [
      { t: "Hi vaig arribar amb una lumbàlgia que no em deixava dormir. En tres setmanes, una altra vida.", w: 'Pacient de 48 anys' },
      { t: "Em van preparar per tornar a córrer després de l'esquinç, pas a pas.", w: 'Corredora popular' },
    ],
  },
  visita: {
    title: 'El centre',
    address: 'Rambla de la Marina, 187, 1r 1a, L’Hospitalet de Llobregat',
    email: 'Correu',
    phone: 'Telèfon',
    phonePending: 'Per confirmar amb el centre',
    hours: 'Horari',
    mapTitle: 'Mapa de FISAL',
  },
  cita: { title: 'Demana la teva cita', text: "Explica'ns què et passa; et truquem per a la primera valoració.", submit: 'Demanar cita', area: 'Servei' },
  footer: 'FISAL, fisioteràpia i salut a Bellvitge',
};

export const { LangProvider, useI18n } = createI18n({ es, ca });
