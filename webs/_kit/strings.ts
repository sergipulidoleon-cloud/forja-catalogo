export type KitStrings = {
  demoNotice: string;
  demoNoticeLong: string;
  demoTag: string;
  exampleReview: string;
  exampleReviewsNote: string;
  photoSlot: string;
  examplesNote: string;
  hoursPending: string;
  hoursFromSite: string;
  priceOnRequest: string;
  mapLoad: string;
  mapOpen: string;
  mapConsent: string;
  toastWhatsapp: string;
  toastCall: string;
  toastBooking: string;
  toastEmail: string;
  langLabel: string;
  skip: string;
  sceneLabel: string;
  motionEnable: string;
  bookingSent: string;
  formName: string;
  formPhone: string;
  formDate: string;
  formTime: string;
  formPeople: string;
  formNote: string;
  formRequired: string;
};

export const kitStrings: Record<'es' | 'ca', KitStrings> = {
  es: {
    demoNotice: 'Propuesta de diseño — demo no oficial',
    demoNoticeLong:
      'Esta página es una propuesta de diseño creada por Sergi Pulido León. No es la web oficial del negocio ni está afiliada a él. Fotos, reseñas y precios son de ejemplo.',
    demoTag: 'Demo no oficial',
    exampleReview: 'Reseña de ejemplo',
    exampleReviewsNote: 'Textos de muestra para enseñar el diseño. En la web real irían reseñas verificadas.',
    photoSlot: 'Espacio para foto real',
    examplesNote: 'Contenido de ejemplo: se completa con la información real del negocio.',
    hoursPending: 'Horario por confirmar con el negocio',
    hoursFromSite: 'Horario publicado en su web actual',
    priceOnRequest: 'Precio a consultar',
    mapLoad: 'Cargar mapa',
    mapOpen: 'Abrir en Google Maps',
    mapConsent: 'El mapa se carga desde Google solo si lo pides.',
    toastWhatsapp: 'Demo: en la web real, este botón abriría WhatsApp con el negocio.',
    toastCall: 'Demo: en la web real, este botón llamaría al negocio.',
    toastBooking: 'Demo: en la web real, aquí se confirmaría la reserva.',
    toastEmail: 'Demo: en la web real, este botón abriría el correo.',
    langLabel: 'Idioma',
    skip: 'Saltar al contenido',
    sceneLabel: 'Ilustración 3D interactiva',
    motionEnable: 'Mover con el móvil',
    bookingSent: 'Solicitud de demo enviada. En la web real, el negocio la recibiría al momento.',
    formName: 'Nombre',
    formPhone: 'Teléfono',
    formDate: 'Día',
    formTime: 'Hora',
    formPeople: 'Personas',
    formNote: 'Comentario',
    formRequired: 'Rellena este campo para continuar.',
  },
  ca: {
    demoNotice: 'Proposta de disseny — demo no oficial',
    demoNoticeLong:
      "Aquesta pàgina és una proposta de disseny creada per Sergi Pulido León. No és el web oficial del negoci ni hi està afiliada. Les fotos, ressenyes i preus són d'exemple.",
    demoTag: 'Demo no oficial',
    exampleReview: "Ressenya d'exemple",
    exampleReviewsNote: 'Textos de mostra per ensenyar el disseny. Al web real hi anirien ressenyes verificades.',
    photoSlot: 'Espai per a foto real',
    examplesNote: "Contingut d'exemple: es completa amb la informació real del negoci.",
    hoursPending: 'Horari per confirmar amb el negoci',
    hoursFromSite: 'Horari publicat al seu web actual',
    priceOnRequest: 'Preu a consultar',
    mapLoad: 'Carregar el mapa',
    mapOpen: 'Obrir a Google Maps',
    mapConsent: 'El mapa es carrega des de Google només si ho demanes.',
    toastWhatsapp: 'Demo: al web real, aquest botó obriria WhatsApp amb el negoci.',
    toastCall: 'Demo: al web real, aquest botó trucaria al negoci.',
    toastBooking: 'Demo: al web real, aquí es confirmaria la reserva.',
    toastEmail: 'Demo: al web real, aquest botó obriria el correu.',
    langLabel: 'Idioma',
    skip: 'Saltar al contingut',
    sceneLabel: 'Il·lustració 3D interactiva',
    motionEnable: 'Moure amb el mòbil',
    bookingSent: 'Sol·licitud de demo enviada. Al web real, el negoci la rebria a l’instant.',
    formName: 'Nom',
    formPhone: 'Telèfon',
    formDate: 'Dia',
    formTime: 'Hora',
    formPeople: 'Persones',
    formNote: 'Comentari',
    formRequired: 'Omple aquest camp per continuar.',
  },
};
