import { business, pricing, teenCourse, adultCourse, roadTestSites, fullAddress } from "./site";
import type { Lang } from "@/lib/i18n";

/**
 * Knowledge base for the on-site assistant.
 *
 * Every answer is drawn from the site's own content — the assistant never
 * invents a fact. When nothing scores above the confidence threshold it says so
 * and offers a callback rather than guessing.
 *
 * This is intentionally a plain retrieval layer. Swapping it for a real Claude
 * API call later means replacing `findAnswer()` in src/lib/chat.ts and nothing
 * else; the widget, the lead capture and the knowledge base all stay as they are.
 */
export type Entry = {
  id: string;
  /** Match terms, lower-case and accent-free. More specific terms first. */
  keywords: Record<Lang, string[]>;
  answer: Record<Lang, string>;
  /** Optional route to offer as a "read more" link. */
  href?: string;
  linkLabel?: Record<Lang, string>;
};

export const knowledge: Entry[] = [
  {
    id: "teen-course",
    keywords: {
      en: ["teen course", "teen class", "teenager", "teen", "minor", "14", "15", "16", "17", "high school", "drivers ed for teens"],
      es: ["curso adolescente", "clase adolescente", "adolescente", "menor", "joven", "14", "15", "16", "17", "preparatoria", "secundaria"],
    },
    answer: {
      en: `Our teen course is TDLR approved. It includes ${teenCourse.classroomHours} hours in the classroom and ${teenCourse.inCarHours} hours of in-car training — ${teenCourse.behindTheWheelHours} hours behind the wheel and ${teenCourse.observationHours} hours of observation. A permit certificate is issued after passing the permit test, given after ${teenCourse.permitTestAfterHours} hours of the course. A new class generally begins every ${teenCourse.newClassEveryWeeks} weeks.`,
      es: `Nuestro curso para adolescentes está aprobado por TDLR. Incluye ${teenCourse.classroomHours} horas de clase teórica y ${teenCourse.inCarHours} horas en el auto — ${teenCourse.behindTheWheelHours} horas al volante y ${teenCourse.observationHours} horas de observación. Se emite un certificado de permiso al aprobar el examen, que se aplica tras ${teenCourse.permitTestAfterHours} horas del curso. Generalmente inicia una nueva clase cada ${teenCourse.newClassEveryWeeks} semanas.`,
    },
    href: "/teen-driving-classes",
    linkLabel: { en: "Teen drivers education", es: "Educación vial para adolescentes" },
  },
  {
    id: "adult-course",
    keywords: {
      en: ["adult course", "adult class", "adult", "18", "over 18", "grown up", "adults"],
      es: ["curso adulto", "clase adulto", "adulto", "adultos", "18", "mayor de edad"],
    },
    answer: {
      en: `The adult course is a ${adultCourse.hours} hour, TDLR approved course for anyone ${adultCourse.minimumAge} or older. Adult classes are held separately from teen classes, and are offered in both English and Spanish. You may also take the written or computer test at our school.`,
      es: `El curso para adultos es de ${adultCourse.hours} horas, aprobado por TDLR, para cualquier persona de ${adultCourse.minimumAge} años o más. Las clases para adultos son separadas de las de adolescentes y se ofrecen en inglés y en español. También puedes presentar el examen escrito o por computadora en nuestra escuela.`,
    },
    href: "/adult-drivers-education",
    linkLabel: { en: "Adult drivers education", es: "Educación vial para adultos" },
  },
  {
    id: "road-test-price",
    keywords: {
      en: ["road test cost", "road test price", "how much road test", "price", "cost", "how much", "fee", "$"],
      es: ["cuanto cuesta examen", "precio examen", "costo", "precio", "cuanto cuesta", "cuanto", "tarifa"],
    },
    answer: {
      en: `The DPS-approved road test is $${pricing.roadTest.price}, and that includes up to ${pricing.roadTest.attempts} chances to pass. School vehicles are available at no extra cost — just reserve in advance. For course pricing, give us a call on ${business.phone}.`,
      es: `El examen de manejo aprobado por DPS cuesta $${pricing.roadTest.price} e incluye hasta ${pricing.roadTest.attempts} oportunidades para aprobar. Los vehículos de la escuela no tienen costo adicional — solo resérvalos con anticipación. Para precios de los cursos, llámanos al ${business.phone}.`,
    },
    href: "/road-tests",
    linkLabel: { en: "Road tests", es: "Exámenes de manejo" },
  },
  {
    id: "road-test-locations",
    keywords: {
      en: ["road test location", "where road test", "queenston", "eldridge", "barker", "test site", "dps location"],
      es: ["donde examen", "ubicacion examen", "queenston", "eldridge", "barker", "sitio de examen", "lugar examen"],
    },
    answer: {
      en: `We are DPS authorized to conduct road tests at our ${roadTestSites.join(", ")} locations, and we have openings 7 days per week.`,
      es: `Estamos autorizados por DPS para aplicar exámenes de manejo en nuestras ubicaciones de ${roadTestSites.join(", ")}, y tenemos citas los 7 días de la semana.`,
    },
    href: "/approved-road-test-locations",
    linkLabel: { en: "All locations", es: "Todas las ubicaciones" },
  },
  {
    id: "road-test-requirements",
    keywords: {
      en: ["what do i need", "what to bring", "requirements", "documents", "de-964", "ade-1317", "ittd", "impact texas", "permit", "bring"],
      es: ["que necesito", "que llevar", "requisitos", "documentos", "de-964", "ade-1317", "ittd", "impact texas", "permiso", "traer"],
    },
    answer: {
      en: `What you need depends on your age. Ages 16–17 need a current DE-964, a learner's permit held at least 6 months, parental supervision and the ITTD video within 90 days. Ages 18–24 need an approved DE-964 or ADE-1317, a valid restricted licence and the Impact Texas video. Ages 25+ need a legal Texas learner's licence and the Impact Texas video, and are exempt from driver's education.`,
      es: `Depende de tu edad. De 16 a 17 años: DE-964 vigente, permiso de aprendizaje con al menos 6 meses, supervisión de un padre o tutor y el video ITTD de los últimos 90 días. De 18 a 24: DE-964 o ADE-1317 aprobado, licencia restringida válida y el video Impact Texas. De 25 en adelante: permiso de aprendizaje de Texas vigente y el video Impact Texas; están exentos del curso de educación vial.`,
    },
    href: "/road-test-checklist",
    linkLabel: { en: "Readiness checklist", es: "Lista de verificación" },
  },
  {
    id: "spanish",
    keywords: {
      en: ["spanish", "espanol", "en espanol", "language", "bilingual"],
      es: ["espanol", "ingles", "idioma", "bilingue", "en espanol"],
    },
    answer: {
      en: `Yes — our adult classes are offered in both English and Spanish, any time. ¡Las clases para adultos se ofrecen en inglés o español cualquier tiempo!`,
      es: `¡Sí! Nuestras clases para adultos se ofrecen en inglés y en español, a cualquier hora. Y este sitio completo está disponible en español.`,
    },
    href: "/adult-drivers-education",
    linkLabel: { en: "Adult classes", es: "Clases para adultos" },
  },
  {
    id: "location",
    keywords: {
      en: ["where are you", "address", "located", "location", "office", "directions", "little york"],
      es: ["donde estan", "direccion", "ubicados", "ubicacion", "oficina", "como llegar", "little york"],
    },
    answer: {
      en: `Our office is at ${fullAddress}. We also serve 28 communities across the greater Houston area, and conduct road tests at ${roadTestSites.join(", ")}.`,
      es: `Nuestra oficina está en ${fullAddress}. También atendemos 28 comunidades en el área de Houston y aplicamos exámenes en ${roadTestSites.join(", ")}.`,
    },
    href: "/approved-road-test-locations",
    linkLabel: { en: "Locations", es: "Ubicaciones" },
  },
  {
    id: "signup",
    keywords: {
      en: ["sign up", "signup", "enroll", "register", "book", "how do i start", "get started", "schedule"],
      es: ["inscribir", "inscripcion", "registrar", "agendar", "como empiezo", "comenzar", "apuntar"],
    },
    answer: {
      en: `The quickest way is to call us on ${business.phone} — we'll check the next available class and get you booked. You can also send a request through the contact page and we'll call you back.`,
      es: `Lo más rápido es llamarnos al ${business.phone} — revisamos la próxima clase disponible y te inscribimos. También puedes enviarnos una solicitud desde la página de contacto y te llamamos.`,
    },
    href: "/contact-us",
    linkLabel: { en: "Request a class time", es: "Solicita un horario" },
  },
  {
    id: "schedule",
    keywords: {
      en: ["when are classes", "class times", "schedule", "hours", "evening", "weekend", "days", "timings"],
      es: ["cuando son clases", "horarios", "horario", "tarde", "fin de semana", "dias"],
    },
    answer: {
      en: `Class timings vary through the year, but a new teen class generally begins every ${teenCourse.newClassEveryWeeks} weeks, and adult classes run every day. We offer day, evening and weekend options, with plenty of drive time slots available every day.`,
      es: `Los horarios varían durante el año, pero una nueva clase para adolescentes generalmente inicia cada ${teenCourse.newClassEveryWeeks} semanas, y las clases para adultos son todos los días. Ofrecemos opciones de día, tarde y fin de semana, con muchos horarios de práctica disponibles diariamente.`,
    },
  },
  {
    id: "defensive",
    keywords: {
      en: ["defensive driving", "ticket", "dismiss", "citation", "insurance discount", "court"],
      es: ["manejo defensivo", "multa", "infraccion", "quitar multa", "descuento seguro", "corte"],
    },
    answer: {
      en: `We offer a defensive driving course for drivers who need to dismiss a ticket, satisfy a court requirement, or work toward an insurance discount. Call us for current dates and pricing.`,
      es: `Ofrecemos un curso de manejo defensivo para quienes necesitan quitar una multa, cumplir con un requisito de la corte o buscar un descuento en el seguro. Llámanos para fechas y precios.`,
    },
    href: "/defensive-driving",
    linkLabel: { en: "Defensive driving", es: "Manejo defensivo" },
  },
  {
    id: "online",
    keywords: {
      en: ["online course", "online", "remote", "at home", "self paced", "virtual"],
      es: ["curso en linea", "en linea", "linea", "remoto", "en casa", "propio ritmo", "virtual"],
    },
    answer: {
      en: `Yes — we have a 100% online teen course you can take at your own pace, anywhere in Texas. It meets all TDLR and state requirements and is taught by certified driving experts.`,
      es: `Sí — tenemos un curso para adolescentes 100% en línea que puedes tomar a tu propio ritmo, desde cualquier lugar de Texas. Cumple con todos los requisitos de TDLR y del estado, e imparten expertos certificados.`,
    },
  },
  {
    id: "payment",
    keywords: {
      en: ["payment", "pay", "card", "zelle", "credit", "debit", "how to pay"],
      es: ["pago", "pagar", "tarjeta", "zelle", "credito", "debito", "como pagar"],
    },
    answer: {
      en: `We accept major credit and debit cards as well as Zelle. Call us and we'll walk you through payment for your course, drive times or road test.`,
      es: `Aceptamos las principales tarjetas de crédito y débito, además de Zelle. Llámanos y te ayudamos con el pago de tu curso, prácticas o examen de manejo.`,
    },
    href: "/online-payments",
    linkLabel: { en: "Payments", es: "Pagos" },
  },
  {
    id: "group-discount",
    keywords: {
      en: ["group discount", "discount", "group", "friends", "cheaper", "deal"],
      es: ["descuento grupo", "descuento", "grupo", "amigos", "mas barato", "promocion"],
    },
    answer: {
      en: `Yes, group discounts are available. Give us a call on ${business.phone} for details.`,
      es: `Sí, hay descuentos para grupos disponibles. Llámanos al ${business.phone} para más detalles.`,
    },
  },
  {
    id: "learning-support",
    keywords: {
      en: ["learning disability", "disability", "special needs", "adhd", "autism", "extra help", "one on one", "anxious", "nervous"],
      es: ["discapacidad", "dificultad de aprendizaje", "necesidades especiales", "tdah", "autismo", "ayuda extra", "nervioso", "ansiedad"],
    },
    answer: {
      en: `Yes. We provide one-on-one help for students with learning disabilities so the course is genuinely accessible. Let us know when you enrol and we'll make the arrangements. Our instructors are known for being calm and patient.`,
      es: `Sí. Ofrecemos atención personalizada para estudiantes con dificultades de aprendizaje para que el curso sea realmente accesible. Avísanos al inscribirte y hacemos los arreglos. Nuestros instructores son conocidos por ser tranquilos y pacientes.`,
    },
  },
  {
    id: "vehicle",
    keywords: {
      en: ["own car", "my car", "school car", "vehicle", "school vehicle", "personal vehicle", "insurance", "registration", "plates"],
      es: ["mi carro", "mi auto", "carro escuela", "vehiculo", "vehiculo personal", "seguro", "registro", "placas"],
    },
    answer: {
      en: `You can use either. School vehicles are offered at no extra cost — reserve in advance for guaranteed availability. If you bring your own vehicle it needs valid inspection and registration, front and back licence plates, and proof of liability insurance.`,
      es: `Puedes usar cualquiera. Los vehículos de la escuela no tienen costo adicional — resérvalos con anticipación. Si traes tu propio vehículo, necesita inspección y registro vigentes, placas delantera y trasera, y comprobante de seguro de responsabilidad civil.`,
    },
    href: "/road-tests",
    linkLabel: { en: "Road tests", es: "Exámenes de manejo" },
  },
  {
    id: "parent-taught",
    keywords: {
      en: ["parent taught", "parent-taught", "ptde", "teach my own", "pick up", "school pickup"],
      es: ["ensenanza de padres", "padres ensenan", "recoger en escuela", "recogida"],
    },
    answer: {
      en: `We offer parent-taught options as well as school pick-up, so behind-the-wheel hours can fit around the family calendar.`,
      es: `Ofrecemos la opción de enseñanza por parte de los padres y también recogida en la escuela, para que las horas al volante se ajusten al calendario familiar.`,
    },
    href: "/teen-driving-classes",
    linkLabel: { en: "Teen classes", es: "Clases para adolescentes" },
  },
  {
    id: "instructor-jobs",
    keywords: {
      en: ["job", "hiring", "career", "become an instructor", "instructor training", "work for you", "employment"],
      es: ["trabajo", "empleo", "contratando", "ser instructor", "capacitacion instructor", "carrera"],
    },
    answer: {
      en: `We offer instructor training courses, continuing education, and management and contractor opportunities. If you're certified — or want to be — we'd like to hear from you.`,
      es: `Ofrecemos cursos de capacitación para instructores, educación continua y oportunidades de gerencia y contratación. Si ya estás certificado, o quieres estarlo, nos encantaría saber de ti.`,
    },
    href: "/instructors",
    linkLabel: { en: "For instructors", es: "Para instructores" },
  },
  {
    id: "areas",
    keywords: {
      en: ["do you serve", "cypress", "katy", "tomball", "spring", "woodlands", "humble", "pasadena", "area", "near me", "my city"],
      es: ["atienden", "cypress", "katy", "tomball", "spring", "woodlands", "humble", "pasadena", "area", "cerca de mi", "mi ciudad"],
    },
    answer: {
      en: `We serve 28 communities across the greater Houston area — including Cypress, Katy, Houston, Tomball, Spring and The Woodlands. Tell me your city and I can point you to the right page.`,
      es: `Atendemos 28 comunidades en el área de Houston — incluyendo Cypress, Katy, Houston, Tomball, Spring y The Woodlands. Dime tu ciudad y te indico la página correcta.`,
    },
    href: "/approved-road-test-locations",
    linkLabel: { en: "Service areas", es: "Áreas de servicio" },
  },
  {
    id: "phone",
    keywords: {
      en: ["phone", "call", "number", "contact", "talk to someone", "speak"],
      es: ["telefono", "llamar", "numero", "contacto", "hablar con alguien"],
    },
    answer: {
      en: `You can reach us on ${business.phone}, or ${business.phoneAlt} as an alternative. We're happy to answer anything over the phone.`,
      es: `Puedes llamarnos al ${business.phone}, o al ${business.phoneAlt} como alternativa. Con gusto respondemos cualquier pregunta por teléfono.`,
    },
    href: "/contact-us",
    linkLabel: { en: "Contact us", es: "Contáctanos" },
  },
  {
    id: "about",
    keywords: {
      en: ["how long", "since when", "established", "experience", "who are you", "about", "trust", "licensed", "insured", "tdlr"],
      es: ["desde cuando", "hace cuanto", "experiencia", "quienes son", "acerca", "confianza", "licencia", "asegurados", "tdlr"],
    },
    answer: {
      en: `We've been serving Houston since ${business.foundedYear}. We're licensed and insured, and all our courses are TDLR approved.`,
      es: `Servimos a Houston desde ${business.foundedYear}. Contamos con licencia y seguro, y todos nuestros cursos están aprobados por TDLR.`,
    },
    href: "/about-us",
    linkLabel: { en: "About us", es: "Nosotros" },
  },
];

/** Words that carry no signal and would otherwise inflate match scores. */
export const STOPWORDS: Record<Lang, string[]> = {
  en: ["the", "a", "an", "is", "are", "do", "does", "you", "your", "i", "my", "me", "we", "to", "of",
       "for", "and", "or", "in", "on", "at", "it", "can", "what", "how", "when", "where", "there",
       "have", "has", "with", "that", "this", "be", "will", "would", "please", "hi", "hello", "thanks"],
  es: ["el", "la", "los", "las", "un", "una", "es", "son", "de", "del", "y", "o", "en", "a", "que",
       "como", "cuando", "donde", "por", "para", "con", "mi", "me", "tu", "su", "se", "lo", "al",
       "hay", "tiene", "tienen", "puedo", "puede", "quiero", "hola", "gracias", "si"],
};
