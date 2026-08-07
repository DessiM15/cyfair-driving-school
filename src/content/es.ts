import type { Dictionary } from "./en";
import { business, fullAddress, pricing, teenCourse, adultCourse } from "./site";

/**
 * Spanish dictionary.
 *
 * Written in neutral Latin American Spanish (the Houston market default), not a
 * literal translation. Typed as `Dictionary`, so any key missing here is a
 * compile error rather than a blank space on the page.
 *
 * NOTE FOR LAUNCH: have a native speaker review this file. It is the only file
 * that needs to change — no component contains hard-coded Spanish.
 */
export const es: Dictionary = {
  langName: "Español",
  otherLangName: "English",

  nav: {
    home: "Inicio",
    teens: "Adolescentes",
    adults: "Adultos",
    roadTests: "Exámenes de manejo",
    defensive: "Manejo defensivo",
    instructors: "Para instructores",
    payments: "Pagos en línea",
    locations: "Ubicaciones",
    about: "Nosotros",
    contact: "Contacto",
    more: "Más",
    menu: "Menú",
    close: "Cerrar",
    skipToContent: "Ir al contenido",
    openMenu: "Abrir menú de navegación",
  },

  common: {
    callNow: "Llámanos",
    callUs: "Llámanos",
    callToEnroll: "Llama para inscribirte",
    enrollToday: "Inscríbete hoy",
    requestClassTime: "Solicita un horario de clase",
    bookRoadTest: "Agenda tu examen de manejo",
    learnMore: "Más información",
    readMore: "Leer más",
    viewAll: "Ver todo",
    getStarted: "Comenzar",
    backToTop: "Volver arriba",
    phone: "Teléfono",
    email: "Correo electrónico",
    address: "Dirección",
    hours: "Horario",
    callForPricing: "Llama para conocer los precios",
    included: "Incluido",
    required: "Requerido",
    optional: "Opcional",
    step: "Paso",
    of: "de",
    next: "Siguiente",
    back: "Atrás",
    startOver: "Empezar de nuevo",
    yes: "Sí",
    no: "No",
    breadcrumb: "Ruta de navegación",
    tdlrApproved: "Aprobado por TDLR",
    dpsAuthorized: "Autorizado por DPS",
    sinceYear: `Sirviendo a Houston desde ${business.foundedYear}`,
  },

  home: {
    metaTitle: `Escuela de Manejo en Houston y Cypress, TX | ${business.name}`,
    metaDescription:
      "Educación vial aprobada por TDLR para adolescentes y adultos, exámenes de manejo autorizados por DPS y manejo defensivo en Houston, Cypress, Katy y toda el área de Houston. Clases en inglés y español.",
    hero: {
      eyebrow: "Educación vial para adolescentes y adultos en Houston y Cypress",
      title: "Maneja Seguro.",
      titleAccent: "Futuro Brillante.",
      subtitle:
        "Educación vial aprobada por TDLR, instructores pacientes y exámenes de manejo autorizados por DPS — al servicio de las familias del área de Houston desde 2014.",
      primaryCta: "Solicita un horario de clase",
      secondaryCta: `Llama al ${business.phone}`,
      scrollHint: "Desplázate para explorar",
    },
    trustBar: {
      title: "Por qué las familias nos eligen",
      items: [
        "Cursos aprobados por TDLR",
        "Con licencia y asegurados",
        "Opciones de día, tarde y fin de semana",
        "Muchos horarios de práctica todos los días",
      ],
    },
    stats: [
      { value: business.foundedYear, suffix: "", label: "Sirviendo a Houston desde", isYear: true },
      { value: 28, suffix: "+", label: "Comunidades atendidas", isYear: false },
      { value: 3, suffix: "", label: "Ubicaciones para el examen DPS", isYear: false },
      { value: 7, suffix: "", label: "Días a la semana para exámenes", isYear: false },
    ],
    intro: {
      eyebrow: "Quiénes somos",
      title: "Una escuela de manejo basada en la enseñanza paciente y personal",
      body: [
        "Aprender a manejar es un logro importante — y para la mayoría de las familias, también un momento de nervios. Desde 2014 hemos ayudado a adolescentes y adultos de toda el área de Houston a obtener su licencia con cursos aprobados, instructores pacientes y horarios que se ajustan a la vida real.",
        "Ya sea que seas un padre inscribiendo a tu hijo en su primer curso, un adulto obteniendo su licencia más tarde en la vida, o un estudiante que solo necesita presentar el examen de manejo, aquí hay un camino claro para ti.",
      ],
    },
    courses: {
      eyebrow: "Nuestros programas",
      title: "Encuentra el curso ideal para ti",
      subtitle: "Cuatro formas de obtener tu licencia, todas impartidas por instructores certificados de Texas.",
      items: [
        {
          key: "teen",
          name: "Educación vial para adolescentes",
          age: "De 14 a 17 años",
          summary:
            "El curso completo aprobado por TDLR: clases teóricas, práctica al volante y horas de observación, con un certificado de permiso durante el proceso.",
          href: "/teen-driving-classes",
          image: "teen-focused" as const,
        },
        {
          key: "adult",
          name: "Educación vial para adultos",
          age: "18 años en adelante",
          summary: `Un curso de ${adultCourse.hours} horas aprobado por TDLR, separado de las clases de adolescentes y disponible en inglés y español.`,
          href: "/adult-drivers-education",
          image: "adult-woman-smile" as const,
        },
        {
          key: "road-test",
          name: "Exámenes de manejo DPS",
          age: "Todas las edades",
          summary: `Exámenes autorizados en tres ubicaciones, siete días a la semana, con hasta ${pricing.roadTest.attempts} oportunidades para aprobar.`,
          href: "/road-tests",
          image: "car-white" as const,
        },
        {
          key: "defensive",
          name: "Manejo defensivo",
          age: "Todas las edades",
          summary:
            "Quita una multa, cumple con un requisito de la corte u obtén un descuento en tu seguro con nuestro curso de manejo defensivo.",
          href: "/defensive-driving",
          image: "texas-highway" as const,
        },
      ],
    },
    online: {
      eyebrow: "Nuevo",
      title: "¿Prefieres aprender en línea?",
      body: "Nuestro curso para adolescentes 100% en línea te permite avanzar a tu propio ritmo, desde cualquier lugar de Texas.",
      features: [
        { title: "100% EN LÍNEA", body: "Aprende a tu propio ritmo" },
        { title: "FLEXIBLE", body: "Estudia cuando y donde quieras" },
        { title: "PARA JÓVENES DE TEXAS", body: "Cumple con todos los requisitos estatales" },
        { title: "APROBADO POR EL ESTADO", body: "Cumple con todos los requisitos de TDLR" },
        { title: "CONFIABLE", body: "Impartido por expertos certificados en manejo" },
      ],
      cta: "Visita el curso en línea",
    },
    why: {
      eyebrow: "La diferencia",
      title: "Entrenamiento flexible, en tu horario",
      items: [
        {
          title: "Entrenamiento al volante flexible",
          body: "Horarios de práctica que se ajustan a la escuela, el trabajo y la familia — y no al revés.",
        },
        {
          title: "Muchos horarios de práctica disponibles todos los días",
          body: "Mantenemos el calendario abierto para que los estudiantes no esperen semanas entre clases.",
        },
        {
          title: "Aprende cuando te convenga",
          body: "Opciones de día, tarde y fin de semana en toda el área de Houston.",
        },
        {
          title: "Atención personalizada cuando hace falta",
          body: "Trabajamos con estudiantes con dificultades de aprendizaje para que el curso sea realmente accesible.",
        },
      ],
    },
    quizTeaser: {
      eyebrow: "¿No sabes por dónde empezar?",
      title: "Responde tres preguntas y te diremos cuál es tu curso",
      body: "Toma unos treinta segundos y al final tendrás una recomendación clara con el siguiente paso.",
      cta: "Encuentra tu curso",
    },
    testimonials: {
      eyebrow: "Reseñas",
      title: "Lo que dicen nuestros estudiantes",
      subtitle: "Reseñas de nuestro perfil de Google Business.",
    },
    areas: {
      eyebrow: "Dónde enseñamos",
      title: "Al servicio de toda el área de Houston",
      body: "Desde Cypress y Katy hasta Spring, Tomball y The Woodlands — con exámenes de manejo autorizados por DPS en tres ubicaciones convenientes.",
      cta: "Ver todas las áreas de servicio",
    },
    cta: {
      title: "¿Listo para empezar?",
      body: "Llámanos y te explicamos los horarios, los precios y la próxima fecha de inicio disponible.",
      primary: "Solicita un horario de clase",
      secondary: `Llama al ${business.phone}`,
    },
  },

  teen: {
    metaTitle: "Clases de manejo para adolescentes en Houston y Cypress, TX",
    metaDescription:
      "Educación vial para adolescentes aprobada por TDLR en Houston y Cypress. Clases teóricas, práctica al volante y horas de observación, con certificado de permiso incluido.",
    hero: {
      eyebrow: "De 14 a 17 años",
      title: "Clases de educación vial para adolescentes en Houston y Cypress, TX",
      subtitle:
        "¡Inscripciones abiertas! Regístrate antes de que se llenen. Generalmente inicia una nueva clase cada dos semanas.",
    },
    what: {
      title: "¿En qué consiste el curso para adolescentes?",
      body: [
        "Es un curso aprobado por TDLR (Departamento de Licencias y Regulación de Texas).",
        `El curso incluye ${teenCourse.classroomHours} horas de clase teórica y ${teenCourse.inCarHours} horas de entrenamiento en el auto.`,
        `Las ${teenCourse.inCarHours} horas en el auto se dividen en ${teenCourse.behindTheWheelHours} horas de manejo al volante y ${teenCourse.observationHours} horas de observación.`,
        `Se emite un certificado de permiso después de aprobar el examen que se aplica tras ${teenCourse.permitTestAfterHours} horas del curso.`,
      ],
      breakdown: [
        { value: teenCourse.classroomHours, unit: "horas", label: "En el salón de clases" },
        { value: teenCourse.behindTheWheelHours, unit: "horas", label: "Al volante" },
        { value: teenCourse.observationHours, unit: "horas", label: "De observación" },
      ],
    },
    when: {
      title: "¿Cuándo son las clases?",
      body: `Los horarios pueden variar durante el año, pero generalmente inicia una nueva clase cada ${teenCourse.newClassEveryWeeks} semanas.`,
    },
    advantages: {
      title: "Ventajas de tomar nuestro curso",
      items: [
        "¡Entrenamiento al volante flexible!",
        "¡Muchos horarios de práctica disponibles todos los días!",
        "¡Aprende cuando te convenga!",
      ],
    },
    parentTaught: {
      title: "Opciones de enseñanza por los padres y recogida en la escuela",
      body: "Ofrecemos la opción de enseñanza por parte de los padres y también recogida en la escuela, para que las horas al volante se ajusten al calendario familiar.",
    },
    faqTitle: "Preguntas frecuentes sobre la educación vial",
    faqs: [
      {
        q: "¿Qué opciones de clases y ubicaciones hay?",
        a: "Damos clases en ubicaciones convenientes por toda el área de Houston, con opciones de día, tarde y fin de semana. Llámanos y encontraremos la clase y la ubicación que mejor te funcione.",
      },
      {
        q: "¿Cómo funcionan los horarios de práctica?",
        a: "Mantenemos muchos horarios de práctica abiertos todos los días, para que los estudiantes no esperen semanas entre clases al volante. Los horarios se pueden coordinar con la escuela y los compromisos familiares.",
      },
      {
        q: "¿Ofrecen exámenes de manejo?",
        a: `Sí. Estamos autorizados para aplicar exámenes de manejo DPS en nuestras ubicaciones de Queenston, Eldridge y Barker Cypress, siete días a la semana. El examen cuesta $${pricing.roadTest.price} e incluye hasta ${pricing.roadTest.attempts} oportunidades para aprobar.`,
      },
      {
        q: "¿Pueden ayudar a estudiantes con dificultades de aprendizaje?",
        a: "Sí. Ofrecemos atención personalizada para estudiantes con dificultades de aprendizaje, para que el curso sea realmente accesible. Avísanos al inscribirte y haremos los arreglos necesarios.",
      },
      {
        q: "¿Tienen descuentos para grupos?",
        a: "Sí, hay descuentos para grupos disponibles. Llámanos para más detalles.",
      },
    ],
    cta: {
      title: "Inscríbete ahora en las clases de educación vial para adolescentes",
      body: "Llámanos para conocer la próxima fecha de inicio y reservar un lugar.",
    },
  },

  adult: {
    metaTitle: "Clases de manejo para adultos en Houston y Cypress, TX",
    metaDescription: `Curso de educación vial para adultos de ${adultCourse.hours} horas aprobado por TDLR en Houston y Cypress, disponible en inglés y español, separado de las clases de adolescentes.`,
    hero: {
      eyebrow: "18 años en adelante",
      title: "Clases de educación vial para adultos en Houston y Cypress, TX",
      subtitle: "¡Felicidades por tus ganas de aprender a manejar!",
    },
    spanishBanner: "¡LAS CLASES PARA ADULTOS SE OFRECEN EN INGLÉS O ESPAÑOL CUALQUIER TIEMPO!",
    spanishBannerNote: "Las clases para adultos se ofrecen en inglés y en español, a cualquier hora.",
    what: {
      title: "¿En qué consiste el curso para adultos?",
      body: [
        `Es un curso de ${adultCourse.hours} horas aprobado por TDLR (Departamento de Licencias y Regulación de Texas), disponible para cualquier persona de ${adultCourse.minimumAge} años o más.`,
      ],
      features: [
        "Clases para adultos por separado, para que no tengas que tomar tu curso con adolescentes",
        "Las clases se ofrecen en inglés y en español",
        "Puedes presentar el examen escrito o por computadora en nuestra escuela",
        "¡Nuestra enseñanza de primer nivel prácticamente garantiza tu éxito!",
        "Vehículos de la escuela disponibles para practicar",
      ],
    },
    when: {
      title: "¿Cuándo son las clases?",
      body: "Hay clases todos los días, aunque los horarios pueden variar. Ubicaciones convenientes en toda el área de Houston.",
    },
    roadTest: {
      title: "También te ayudamos a presentar y aprobar el examen de manejo DPS",
      body: "Al terminar tu curso, puedes presentar tu examen de manejo autorizado por DPS con nosotros en una de tres ubicaciones, siete días a la semana.",
      cta: "Conoce más sobre los exámenes",
    },
    cta: {
      title: "Llámanos para comenzar tu camino a ser un conductor con licencia",
      body: "¿Listo para inscribirte? Llámanos y te apartamos un lugar en la próxima clase disponible.",
    },
  },

  roadTests: {
    metaTitle: "Exámenes de manejo autorizados por DPS en Houston y Cypress",
    metaDescription: `Exámenes de manejo autorizados por DPS en nuestras ubicaciones de Queenston, Eldridge y Barker Cypress, siete días a la semana. $${pricing.roadTest.price} con hasta ${pricing.roadTest.attempts} oportunidades para aprobar.`,
    hero: {
      eyebrow: "Autorizado por DPS",
      title: "¡Exámenes de manejo autorizados por DPS en Houston y Cypress!",
      subtitle:
        "Los exámenes autorizados por DPS están disponibles en nuestras ubicaciones de Queenston, Eldridge y Barker Cypress. ¡Tenemos citas los 7 días de la semana!",
    },
    price: {
      label: "Examen de manejo aprobado por DPS",
      amount: pricing.roadTest.price,
      note: `con hasta ${pricing.roadTest.attempts} oportunidades para aprobar`,
    },
    vehicles: {
      title: "¿Qué vehículo puedo usar?",
      school: {
        title: "Vehículos de la escuela",
        body: "Sin costo adicional. Resérvalo con anticipación para garantizar la disponibilidad.",
      },
      personal: {
        title: "Vehículos personales",
        body: "Deben tener inspección y registro vigentes, placas delantera y trasera, y comprobante de seguro de responsabilidad civil.",
        items: [
          "Inspección y registro vigentes",
          "Placas delantera y trasera",
          "Comprobante de seguro de responsabilidad civil",
        ],
      },
    },
    requirements: {
      title: "Qué necesitas traer",
      subtitle: "Los requisitos dependen de tu edad. Busca tu grupo abajo.",
      groups: [
        {
          age: "De 16 a 17 años",
          items: [
            "Certificado DE-964 vigente que acredite la educación vial para menores",
            "Permiso de aprendizaje válido con al menos 6 meses de antigüedad",
            "Se requiere la supervisión de un padre o tutor",
            "Video Impact Texas Teen Drivers (ITTD) completado en los últimos 90 días",
          ],
        },
        {
          age: "De 18 a 24 años",
          items: [
            "DE-964 o ADE-1317 aprobado de un curso de educación vial",
            "Licencia de conducir restringida válida",
            "Video Impact Texas Drivers completado en los últimos 90 días",
          ],
        },
        {
          age: "25 años en adelante",
          items: [
            "Permiso de aprendizaje de Texas vigente",
            "Video Impact Texas Drivers completado en los últimos 90 días",
            "Exento de tomar el curso de educación vial",
          ],
        },
      ],
    },
    checklistTeaser: {
      title: "¿No sabes si ya estás listo?",
      body: "Repasa nuestra lista interactiva y confírmalo antes de presentarte.",
      cta: "Abrir la lista de verificación",
    },
    cta: { title: "¡Llámanos ahora!", body: "Agenda tu examen en Queenston, Eldridge o Barker Cypress." },
  },

  defensive: {
    metaTitle: "Curso de manejo defensivo en Houston y Cypress, TX",
    metaDescription:
      "Manejo defensivo en Houston y Cypress — quita una multa, cumple con un requisito de la corte u obtén un descuento en tu seguro.",
    hero: {
      eyebrow: "Para todos los conductores",
      title: "Manejo defensivo",
      subtitle: "Quita una multa, cumple con un requisito de la corte o simplemente maneja más seguro en Houston.",
    },
    body: [
      "Nuestro curso de manejo defensivo se ofrece junto con nuestros programas de educación vial, para conductores que necesitan quitar una infracción, cumplir con un requisito de la corte o simplemente mejorar sus habilidades.",
      "Llámanos para conocer las fechas, los precios y los detalles de lo que exige tu corte o tu aseguradora.",
    ],
    reasons: {
      title: "Razones comunes para tomarlo",
      items: [
        { title: "Quitar una multa", body: "Muchas cortes de Texas permiten quitar una infracción elegible con un curso de manejo defensivo." },
        { title: "Descuento en el seguro", body: "Algunas aseguradoras ofrecen un descuento a quienes completan un curso aprobado." },
        { title: "Manejar más seguro", body: "Un repaso de percepción de riesgos, distancia de seguimiento y técnica defensiva." },
      ],
    },
    cta: { title: "Pregunta por el manejo defensivo", body: "Llámanos para conocer fechas y precios." },
  },

  instructors: {
    metaTitle: "Capacitación y empleo para instructores | Cy Fair Driving School",
    metaDescription:
      "Capacitación para instructores, educación continua y oportunidades para contratistas con Cy Fair Driving School en el área de Houston.",
    hero: {
      eyebrow: "Para instructores",
      title: "Construye una carrera enseñando a manejar",
      subtitle:
        "Ofrecemos cursos de capacitación para instructores, educación continua y oportunidades de gerencia y contratación en toda el área de Houston.",
    },
    offerings: {
      title: "Lo que ofrecemos",
      items: [
        { title: "Cursos de capacitación para instructores", body: "Capacitación para quienes buscan certificarse como instructores de manejo en Texas." },
        { title: "Educación continua", body: "Cursos de educación continua para instructores que mantienen su certificación." },
        { title: "Oportunidades de gerencia", body: "Oportunidades para asumir responsabilidades de gerencia dentro de la escuela." },
        { title: "Oportunidades para contratistas", body: "Trabajo por contrato para instructores calificados y con licencia." },
      ],
    },
    why: {
      title: "Por qué enseñar con nosotros",
      items: [
        "Un flujo constante de estudiantes en 28 comunidades",
        "Horarios flexibles — trabajo de día, tarde y fin de semana",
        "Una escuela que forma parte de la comunidad de Houston desde 2014",
      ],
    },
    cta: { title: "¿Te interesa unirte?", body: "Llámanos o envíanos tus datos y nos pondremos en contacto." },
  },

  payments: {
    metaTitle: "Pagos en línea | Cy Fair Driving School",
    metaDescription: "Opciones de pago para Cy Fair Driving School — tarjetas de crédito y débito y Zelle.",
    hero: {
      eyebrow: "Pagos",
      title: "Pagos en línea",
      subtitle: "Paga tu curso o examen de manejo de forma segura.",
    },
    body: "Aceptamos las principales tarjetas de crédito y débito, así como Zelle. Llámanos y te ayudamos con el pago de tu curso, tus prácticas o tu examen de manejo.",
    methodsTitle: "Formas de pago aceptadas",
    note: "Para detalles de pago o para pagar por teléfono, llámanos.",
  },

  locations: {
    metaTitle: "Ubicaciones aprobadas para el examen de manejo | Cy Fair Driving School",
    metaDescription:
      "Nuestras ubicaciones autorizadas por DPS en Houston: Queenston, Eldridge y Barker Cypress. Abierto los siete días de la semana.",
    hero: {
      eyebrow: "Ubicaciones",
      title: "Ubicaciones aprobadas para el examen de manejo",
      subtitle: "Exámenes autorizados por DPS en tres ubicaciones del área de Houston, siete días a la semana.",
    },
    officeTitle: "Oficina principal",
    testSitesTitle: "Ubicaciones autorizadas por DPS",
    testSitesBody:
      "Los exámenes están disponibles en las tres ubicaciones, siete días a la semana. Llama para reservar tu cita y un vehículo de la escuela si lo necesitas.",
    serviceAreaTitle: "Comunidades que atendemos",
    serviceAreaBody: "Enseñamos a estudiantes de toda el área de Houston. Selecciona tu comunidad para más información.",
  },

  about: {
    metaTitle: "Acerca de Cy Fair Driving School | Houston y Cypress",
    metaDescription:
      "Cy Fair Driving School ofrece educación vial de calidad y exámenes de manejo DPS para adolescentes y adultos en toda el área de Houston. Al servicio de las familias desde 2014.",
    hero: {
      eyebrow: "Nosotros",
      title: "Educación vial de calidad para las familias de Houston",
      subtitle: `${business.name} ofrece educación vial de calidad y exámenes de manejo DPS para adolescentes y adultos en toda el área de Houston.`,
    },
    story: {
      title: "Parte de la comunidad de Houston desde 2014",
      body: [
        "Abrimos nuestras puertas en 2014 con una meta sencilla: enseñar a manejar bien y tratar bien a la gente mientras lo hacemos. Desde entonces hemos trabajado con adolescentes en su primera clase, adultos obteniendo su licencia más tarde en la vida y conductores que solo necesitaban a alguien paciente en el asiento del pasajero.",
        "Hoy atendemos 28 comunidades en el área de Houston, ofrecemos clases en inglés y español, y aplicamos exámenes de manejo autorizados por DPS en tres ubicaciones los siete días de la semana.",
      ],
    },
    services: {
      title: "Lo que hacemos",
      items: [
        "Clases de manejo para adolescentes",
        "Opciones de enseñanza por parte de los padres",
        "Educación vial para adultos",
        "Exámenes de manejo DPS",
        "Cursos de manejo defensivo",
        "Cursos de educación continua",
        "Cursos de capacitación para instructores",
        "Oportunidades de gerencia y contratación",
      ],
    },
    values: {
      title: "Lo que nos importa",
      items: [
        { title: "Paciencia", body: "Los conductores nerviosos se vuelven seguros cuando alguien se toma el tiempo. Nuestros instructores lo hacen." },
        { title: "Accesibilidad", body: "Clases en inglés y español, y apoyo personalizado para estudiantes con dificultades de aprendizaje." },
        { title: "Flexibilidad", body: "Opciones de día, tarde y fin de semana, con muchos horarios de práctica todos los días." },
      ],
    },
  },

  team: {
    metaTitle: "Conoce al equipo | Cy Fair Driving School",
    metaDescription: "Conoce a los instructores de Cy Fair Driving School en Houston y Cypress.",
    hero: {
      eyebrow: "Nuestra gente",
      title: "Conoce al equipo",
      subtitle: "Instructores certificados de Texas: pacientes, tranquilos y realmente buenos en esto.",
    },
    body: "Nuestros instructores son la razón por la que los estudiantes nos recomiendan. Están certificados, son pacientes y crean una conexión real con quienes enseñan.",
    placeholderNotice:
      "Los perfiles y las fotografías de los instructores están en preparación. Si quieres saber quién impartirá tu curso, llámanos y con gusto te decimos.",
  },

  reviews: {
    metaTitle: "Reseñas | Cy Fair Driving School",
    metaDescription: "Lee lo que dicen los estudiantes y los padres sobre Cy Fair Driving School en Houston y Cypress.",
    hero: {
      eyebrow: "Reseñas",
      title: "Lo que dicen nuestros estudiantes",
      subtitle: "Reseñas de nuestro perfil de Google Business.",
    },
    cta: { title: "¿Tuviste una buena experiencia?", body: "Te agradeceríamos mucho que nos dejaras una reseña en Google." },
  },

  careers: {
    metaTitle: "Empleo | Cy Fair Driving School",
    metaDescription: "Oportunidades de empleo y contratación con Cy Fair Driving School en el área de Houston.",
    hero: {
      eyebrow: "Empleo",
      title: "Trabaja con nosotros",
      subtitle: "Siempre nos interesa saber de instructores certificados y de quienes quieren serlo.",
    },
    body: "Ofrecemos capacitación para instructores, educación continua y oportunidades de gerencia y contratación. Si ya estás certificado, o quieres estarlo, nos encantaría saber de ti.",
  },

  contact: {
    metaTitle: "Contacta a Cy Fair Driving School | Houston y Cypress",
    metaDescription: `Llama al ${business.phone} o envíanos un mensaje. ${fullAddress}.`,
    hero: {
      eyebrow: "Contáctanos",
      title: "Solicita un horario de clase",
      subtitle: "Cuéntanos qué necesitas y te llamamos con horarios, precios y la próxima fecha de inicio disponible.",
    },
    form: {
      name: "Tu nombre",
      namePlaceholder: "Juana Pérez",
      phone: "Número de teléfono",
      phonePlaceholder: "832-555-0123",
      email: "Correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      course: "¿Qué curso te interesa?",
      courseOptions: [
        "Educación vial para adolescentes",
        "Educación vial para adultos",
        "Examen de manejo DPS",
        "Manejo defensivo",
        "Capacitación para instructores",
        "Otra cosa",
      ],
      location: "Ubicación preferida",
      locationPlaceholder: "Cypress, Katy, Houston…",
      message: "¿Algo más que debamos saber?",
      messagePlaceholder: "Días u horarios preferidos, preguntas, lo que sea.",
      submit: "Enviar solicitud",
      submitting: "Enviando…",
      successTitle: "¡Listo, lo recibimos!",
      successBody:
        "Este es un sitio de demostración, así que no se envió nada. En el sitio real esto llegaría a la escuela de inmediato y alguien te llamaría.",
      sendAnother: "Enviar otra",
      errorRequired: "Este campo es obligatorio",
      errorPhone: "Ingresa un número de teléfono válido",
      errorEmail: "Ingresa un correo electrónico válido",
      demoNotice: "Formulario de demostración — los envíos aún no llegan a ningún lado.",
    },
    details: { title: "Datos de contacto", callTitle: "Llámanos", visitTitle: "Visítanos", followTitle: "Síguenos" },
  },

  privacy: {
    metaTitle: "Aviso de privacidad | Cy Fair Driving School",
    metaDescription: "Cómo maneja Cy Fair Driving School la información que compartes con nosotros.",
    hero: { eyebrow: "Legal", title: "Aviso de privacidad", subtitle: "Cómo manejamos la información que compartes con nosotros." },
    sections: [
      {
        title: "Información que recopilamos",
        body: "Cuando nos contactas por este sitio o por teléfono, recopilamos los datos que decides darnos — normalmente tu nombre, teléfono, correo electrónico y el curso que te interesa.",
      },
      {
        title: "Cómo la usamos",
        body: "Usamos tus datos para responder tu consulta, inscribirte en una clase o examen y mantenerte informado sobre tu curso. No vendemos tu información.",
      },
      {
        title: "Con quién la compartimos",
        body: "Solo compartimos información cuando es necesario para brindarte el servicio que solicitaste, o cuando la ley o el Departamento de Licencias y Regulación de Texas lo exigen.",
      },
      {
        title: "Preguntas",
        body: `Si tienes alguna pregunta sobre tu información, llámanos al ${business.phone} o escríbenos a ${fullAddress}.`,
      },
    ],
    placeholderNotice:
      "Este es un texto de política de ejemplo preparado para un sitio de demostración. Por favor revísalo antes de publicarlo.",
  },

  quiz: {
    metaTitle: "Encuentra tu curso | Cy Fair Driving School",
    metaDescription: "Responde tres preguntas rápidas y te recomendamos el curso de educación vial ideal para ti.",
    hero: {
      eyebrow: "Buscador de cursos",
      title: "Encuentra tu curso",
      subtitle: "Tres preguntas, unos treinta segundos y una respuesta clara al final.",
    },
    questions: [
      {
        id: "age",
        question: "¿Qué edad tiene el estudiante?",
        options: [
          { value: "under18", label: "Menos de 18" },
          { value: "18to24", label: "De 18 a 24" },
          { value: "25plus", label: "25 o más" },
        ],
      },
      {
        id: "permit",
        question: "¿Ya tiene un permiso de aprendizaje?",
        options: [
          { value: "no", label: "Todavía no" },
          { value: "yes", label: "Sí, ya lo tiene" },
          { value: "licensed", label: "Ya tiene licencia" },
        ],
      },
      {
        id: "goal",
        question: "¿Qué está buscando lograr?",
        options: [
          { value: "license", label: "Obtener la licencia de manejo" },
          { value: "roadtest", label: "Solo presentar el examen de manejo" },
          { value: "ticket", label: "Quitar una multa o bajar el seguro" },
        ],
      },
    ],
    resultTitle: "Esto es lo que te recomendamos",
    resultCta: "Solicitar esta clase",
    resultCallCta: "O llámanos",
    restart: "Empezar de nuevo",
    results: {
      teen: {
        name: "Educación vial para adolescentes",
        why: "Como el estudiante es menor de 18 años y busca su licencia, necesita el curso completo para adolescentes aprobado por TDLR — clases teóricas más práctica al volante y horas de observación.",
        href: "/teen-driving-classes",
      },
      adult: {
        name: "Educación vial para adultos",
        why: `Como el estudiante tiene 18 años o más, puede tomar nuestro curso para adultos de ${adultCourse.hours} horas aprobado por TDLR, separado de las clases de adolescentes y disponible en inglés o español.`,
        href: "/adult-drivers-education",
      },
      roadTest: {
        name: "Examen de manejo DPS",
        why: `Parece que el estudiante ya está listo para presentar el examen. Aplicamos exámenes autorizados por DPS en tres ubicaciones, siete días a la semana, por $${pricing.roadTest.price} y con hasta ${pricing.roadTest.attempts} oportunidades para aprobar.`,
        href: "/road-tests",
      },
      defensive: {
        name: "Manejo defensivo",
        why: "Para quitar una infracción o buscar un descuento en el seguro, nuestro curso de manejo defensivo es la opción correcta.",
        href: "/defensive-driving",
      },
      adultExempt: {
        name: "Examen de manejo DPS",
        why: "En Texas, los conductores de 25 años o más están exentos de tomar el curso de educación vial, así que quizá solo necesites el examen con nosotros. Llámanos si prefieres practicar antes.",
        href: "/road-tests",
      },
    },
  },

  checklist: {
    metaTitle: "Lista de verificación para el examen de manejo de Texas | Cy Fair Driving School",
    metaDescription:
      "Una lista interactiva de todo lo que necesitas llevar a tu examen de manejo DPS en Texas, según tu edad. Confirma que estás listo antes de llegar.",
    hero: {
      eyebrow: "Antes de llegar",
      title: "Lista de verificación para el examen de manejo",
      subtitle: "Repásala antes del día del examen. A nadie le gusta que lo regresen por un documento faltante.",
    },
    pickAge: "Primero, ¿qué edad tiene el conductor?",
    ageGroups: [
      { value: "16to17", label: "16–17" },
      { value: "18to24", label: "18–24" },
      { value: "25plus", label: "25+" },
    ],
    vehicleTitle: "¿Y qué vehículo vas a usar?",
    vehicleOptions: [
      { value: "school", label: "Un vehículo de la escuela" },
      { value: "personal", label: "Mi propio vehículo" },
    ],
    progressLabel: "listo",
    allSetTitle: "¡Estás listo!",
    allSetBody: "Ya está todo marcado. Llámanos para agendar tu examen en Queenston, Eldridge o Barker Cypress.",
    notReadyTitle: "Casi listo",
    notReadyBody: "Marca todo lo de arriba y estarás listo. Llámanos si tienes dudas sobre algún punto.",
    schoolVehicleNote:
      "Los vehículos de la escuela no tienen costo adicional — resérvalos con anticipación para garantizar la disponibilidad.",
    resetLabel: "Reiniciar la lista",
    printLabel: "Imprimir esta lista",
  },

  serviceArea: {
    metaTitlePattern: "Escuela de Manejo en {city}, TX | Cy Fair Driving School",
    metaDescriptionPattern:
      "Educación vial para adolescentes y adultos, exámenes de manejo DPS y manejo defensivo al servicio de {city}, Texas. Aprobado por TDLR, clases en inglés y español.",
    eyebrow: "Área de servicio",
    titlePattern: "Escuela de manejo al servicio de {city}, Texas",
    subtitlePattern:
      "Educación vial aprobada por TDLR para adolescentes y adultos, además de exámenes autorizados por DPS, para las familias de {city} y sus alrededores.",
    nearestTestSiteLabel: "Ubicación de examen más cercana",
    servicesTitle: "Lo que ofrecemos en {city}",
    whyTitle: "Por qué las familias de {city} nos eligen",
    otherAreasTitle: "Otras comunidades que atendemos",
    ctaTitle: "Enseñando a manejar en {city} desde 2014",
    ctaBody: "Llámanos para encontrar la próxima clase cerca de ti.",
    backToAll: "Todas las áreas de servicio",
  },

  chatbot: {
    launcherLabel: "Chatea con nosotros",
    title: "Pregúntanos lo que sea",
    subtitle: "Respuestas sobre cursos, exámenes y precios.",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    close: "Cerrar el chat",
    greeting: "¡Hola! Puedo responder preguntas sobre nuestros cursos, exámenes y precios. ¿Qué te gustaría saber?",
    suggestionsLabel: "Preguntas frecuentes",
    suggestions: [
      "¿En qué consiste el curso para adolescentes?",
      "¿Cuánto cuesta el examen de manejo?",
      "¿Tienen clases en español?",
      "¿Dónde están ubicados?",
      "¿Cómo me inscribo?",
    ],
    fallback:
      "No estoy seguro de eso. ¿Quieres dejar tus datos para que alguien de la escuela te llame?",
    leadPrompt: "Claro — ¿cuál es tu nombre y el mejor número para contactarte?",
    leadName: "Tu nombre",
    leadPhone: "Número de teléfono",
    leadSubmit: "Enviar a la escuela",
    leadSuccess:
      "¡Gracias! Este es un sitio de demostración, así que no se envió nada. En el sitio real la escuela lo recibiría de inmediato.",
    leadCta: "Dejar mis datos",
    callInstead: `O llámanos al ${business.phone}`,
    demoBadge: "Demo",
    readMoreOn: "Leer más en",
    typing: "Escribiendo…",
  },

  footer: {
    tagline: "Maneja Seguro. Futuro Brillante.",
    blurb:
      "Educación vial aprobada por TDLR y exámenes de manejo autorizados por DPS para adolescentes y adultos en toda el área de Houston.",
    coursesTitle: "Cursos",
    companyTitle: "La escuela",
    contactTitle: "Contacto",
    areasTitle: "Áreas de servicio",
    rightsReserved: "Todos los derechos reservados.",
    poweredBy: "Desarrollado por",
    privacy: "Aviso de privacidad",
    languageLabel: "Idioma",
    imageNotice: "Las fotografías son ilustrativas.",
  },

  notFound: {
    metaTitle: "Página no encontrada | Cy Fair Driving School",
    title: "No encontramos esa página",
    body: "Puede que la página que buscas se haya movido. Prueba con una de estas opciones o llámanos.",
    home: "Volver al inicio",
  },

  testimonials: [
    {
      name: "Zain Khan",
      quote:
        "The instructors here are the best around. Not only do they establish a personal connection to their students…",
      source: "Google",
    },
    {
      name: "Onepumpbaby 2K",
      quote: "The instructors I've had were very calm and patient with me, which made me less nervous…",
      source: "Google",
    },
    {
      name: "Syed Fahad",
      quote: "I had a great experience at Cyfair driving school. Mohammed Hoque is the best instructor…",
      source: "Google",
    },
  ],
};
