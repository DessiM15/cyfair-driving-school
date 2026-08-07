import { business, fullAddress, pricing, teenCourse, adultCourse } from "./site";

/**
 * English dictionary — the source of truth for all site copy.
 *
 * Every fact, price, requirement and testimonial here comes from
 * cyfairdrivingschool.com. Headlines, section intros and connective prose are
 * newly written, but no claim, credential or statistic has been invented.
 */
export const en = {
  langName: "English",
  otherLangName: "Español",

  nav: {
    home: "Home",
    teens: "Teens",
    adults: "Adults",
    roadTests: "Road Tests",
    defensive: "Defensive Driving",
    instructors: "For Instructors",
    payments: "Online Payments",
    /** Shorter label for the top nav, where horizontal space is tight. */
    paymentsShort: "Payments",
    locations: "Locations",
    about: "About",
    contact: "Contact",
    more: "More",
    menu: "Menu",
    close: "Close",
    skipToContent: "Skip to content",
    openMenu: "Open navigation menu",
  },

  common: {
    callNow: "Call now",
    callUs: "Call us",
    callToEnroll: "Call to enroll",
    enrollToday: "Enroll today",
    requestClassTime: "Request a class time",
    bookRoadTest: "Book a road test",
    learnMore: "Learn more",
    readMore: "Read more",
    viewAll: "View all",
    getStarted: "Get started",
    backToTop: "Back to top",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Hours",
    callForPricing: "Call for current pricing",
    included: "Included",
    required: "Required",
    optional: "Optional",
    step: "Step",
    of: "of",
    next: "Next",
    back: "Back",
    startOver: "Start over",
    yes: "Yes",
    no: "No",
    breadcrumb: "Breadcrumb",
    tdlrApproved: "TDLR approved",
    dpsAuthorized: "DPS authorized",
    sinceYear: `Serving Houston since ${business.foundedYear}`,
  },

  home: {
    metaTitle: `Driving School in Houston & Cypress, TX | ${business.name}`,
    metaDescription:
      "TDLR-approved teen and adult drivers education, DPS-authorized road tests and defensive driving across Houston, Cypress, Katy and the greater Houston area. Classes in English and Spanish.",
    hero: {
      eyebrow: "Drivers Education for Teens & Adults in Houston & Cypress",
      title: "Safe Driving.",
      titleAccent: "Bright Future.",
      subtitle:
        "TDLR-approved driver education, patient instructors and DPS-authorized road tests — serving families across the greater Houston area since 2014.",
      primaryCta: "Request a class time",
      secondaryCta: `Call ${business.phone}`,
      scrollHint: "Scroll to explore",
    },
    trustBar: {
      title: "Why families choose us",
      items: [
        "TDLR approved courses",
        "Licensed & insured",
        "Day, evening & weekend options",
        "Plenty of daily drive time slots",
      ],
    },
    stats: [
      { value: business.foundedYear, suffix: "", label: "Serving Houston since", isYear: true },
      { value: 28, suffix: "+", label: "Communities served", isYear: false },
      { value: 3, suffix: "", label: "DPS road test locations", isYear: false },
      { value: 7, suffix: "", label: "Days a week for road tests", isYear: false },
    ],
    intro: {
      eyebrow: "Who we are",
      title: "A driving school built around patient, personal teaching",
      body: [
        "Learning to drive is a milestone — and for most families, a nerve-wracking one. Since 2014 we have helped teens and adults across the greater Houston area earn their licence with courses that are approved, instructors who are patient, and scheduling that works around real life.",
        "Whether you are a parent booking a first course, an adult driver getting licensed later in life, or a student who just needs a road test, there is a clear path here for you.",
      ],
    },
    courses: {
      eyebrow: "Our programs",
      title: "Find the course that fits",
      subtitle: "Four ways to get licensed, all taught by certified Texas instructors.",
      items: [
        {
          key: "teen",
          name: "Teen Drivers Ed",
          age: "Ages 14–17",
          summary:
            "The full TDLR-approved course: classroom instruction, behind-the-wheel training and observation hours, with a permit certificate issued along the way.",
          href: "/teen-driving-classes",
          image: "teen-focused" as const,
        },
        {
          key: "adult",
          name: "Adult Drivers Ed",
          age: "Ages 18+",
          summary: `A ${adultCourse.hours}-hour TDLR-approved course held separately from teen classes, offered in both English and Spanish.`,
          href: "/adult-drivers-education",
          image: "adult-woman-smile" as const,
        },
        {
          key: "road-test",
          name: "DPS Road Tests",
          age: "All ages",
          summary: `Authorized road tests at three locations, seven days a week, with up to ${pricing.roadTest.attempts} chances to pass.`,
          href: "/road-tests",
          image: "car-white" as const,
        },
        {
          key: "defensive",
          name: "Defensive Driving",
          age: "All ages",
          summary:
            "Dismiss a ticket, satisfy a court requirement or earn an insurance discount with our defensive driving course.",
          href: "/defensive-driving",
          image: "texas-highway" as const,
        },
      ],
    },
    online: {
      eyebrow: "New",
      title: "Prefer to learn online?",
      body: "Our fully online teen course lets you work through the material at your own pace, from anywhere in Texas.",
      features: [
        { title: "100% ONLINE", body: "Learn at your own pace" },
        { title: "FLEXIBLE", body: "Study anytime, anywhere" },
        { title: "FOR TEXAS TEENS", body: "Meets all state requirements" },
        { title: "STATE-APPROVED", body: "Meets all TDLR requirements" },
        { title: "TRUSTED & RELIABLE", body: "Taught by certified driving experts" },
      ],
      cta: "Visit the online course",
    },
    why: {
      eyebrow: "The difference",
      title: "Flexible training, on your schedule",
      items: [
        {
          title: "Flexible, behind the wheel training",
          body: "Drive times that fit around school, work and family — not the other way round.",
        },
        {
          title: "Plenty of drive time slots available every day",
          body: "We keep our calendar open so students are not waiting weeks between lessons.",
        },
        {
          title: "Learn at your convenience",
          body: "Day, evening and weekend options across the greater Houston area.",
        },
        {
          title: "One-on-one help when it's needed",
          body: "We work with students who have learning disabilities to make sure the course is genuinely accessible.",
        },
      ],
    },
    quizTeaser: {
      eyebrow: "Not sure where to start?",
      title: "Answer three questions and we'll point you to the right course",
      body: "It takes about thirty seconds, and you'll get a clear recommendation with the next step spelled out.",
      cta: "Find your course",
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "What our students say",
      subtitle: "Reviews from our Google Business profile.",
    },
    areas: {
      eyebrow: "Where we teach",
      title: "Serving the greater Houston area",
      body: "From Cypress and Katy to Spring, Tomball and The Woodlands — with DPS-authorized road tests at three convenient locations.",
      cta: "See all service areas",
    },
    cta: {
      title: "Ready to get started?",
      body: "Call us and we'll walk you through class times, pricing and the next available start date.",
      primary: "Request a class time",
      secondary: `Call ${business.phone}`,
    },
  },

  teen: {
    metaTitle: "Teen Drivers Education Classes in Houston & Cypress, TX",
    metaDescription:
      "TDLR-approved teen driver education in Houston and Cypress. Classroom instruction, behind-the-wheel training and observation hours, with a permit certificate along the way.",
    hero: {
      eyebrow: "Ages 14–17",
      title: "Teen Driver's Education Classes in Houston & Cypress, TX",
      subtitle:
        "Teen Classes Now Open! Register Before It's Too Late! A new class generally begins every two weeks.",
    },
    what: {
      title: "What is the Teen Course?",
      body: [
        "It is a TDLR (Texas Department of Licensing and Regulation) approved course.",
        `The course includes ${teenCourse.classroomHours} hours in the classroom and ${teenCourse.inCarHours} hours of in-car training.`,
        `For in-car training, the ${teenCourse.inCarHours} hours is divided into ${teenCourse.behindTheWheelHours} hours of driving behind-the-wheel and ${teenCourse.observationHours} hours of observation.`,
        `A permit certificate will be issued after passing the permit test given after ${teenCourse.permitTestAfterHours} hours of the course.`,
      ],
      breakdown: [
        { value: teenCourse.classroomHours, unit: "hours", label: "In the classroom" },
        { value: teenCourse.behindTheWheelHours, unit: "hours", label: "Behind the wheel" },
        { value: teenCourse.observationHours, unit: "hours", label: "Observation" },
      ],
    },
    when: {
      title: "When are Classes Held?",
      body: `Class timings may vary throughout the year, but a new class generally begins every ${teenCourse.newClassEveryWeeks} weeks.`,
    },
    advantages: {
      title: "Advantages Of Taking Our Course",
      items: [
        "Flexible, behind the wheel training!",
        "Plenty drive time slots available everyday!",
        "Learn at your convenience!",
      ],
    },
    parentTaught: {
      title: "Parent-taught and school pick-up options",
      body: "We offer parent-taught options as well as school pick-up, so behind-the-wheel hours can fit around the family calendar.",
    },
    faqTitle: "Frequently Asked Questions About Drivers Ed",
    faqs: [
      {
        q: "What class options and locations are available?",
        a: "We hold classes at convenient locations across the greater Houston area, with day, evening and weekend options. Call us and we will find the class and location that works best for you.",
      },
      {
        q: "How do drive times work?",
        a: "We keep plenty of drive time slots open every day, so students are not waiting weeks between behind-the-wheel lessons. Drive times can be scheduled around school and family commitments.",
      },
      {
        q: "Do you offer road tests?",
        a: `Yes. We are authorized to conduct DPS road tests at our Queenston, Eldridge and Barker Cypress locations, seven days a week. The road test is $${pricing.roadTest.price} with up to ${pricing.roadTest.attempts} chances to pass.`,
      },
      {
        q: "Can you help students with learning disabilities?",
        a: "Yes. We provide one-on-one help for students with learning disabilities so that the course is genuinely accessible. Let us know when you enrol and we will make the arrangements.",
      },
      {
        q: "Do you offer group discounts?",
        a: "Yes, group discounts are available. Give us a call for details.",
      },
    ],
    cta: {
      title: "Register Now for the Teen Drivers Education Classes",
      body: "Call us to check the next available start date and reserve a place.",
    },
  },

  adult: {
    metaTitle: "Adult Drivers Education Classes in Houston & Cypress, TX",
    metaDescription: `A ${adultCourse.hours}-hour TDLR-approved adult driver education course in Houston and Cypress, offered in both English and Spanish, held separately from teen classes.`,
    hero: {
      eyebrow: "Ages 18 and over",
      title: "Adult Driver's Education Classes in Houston & Cypress, TX",
      subtitle: "Congratulations on your desire to learn to drive!",
    },
    spanishBanner: "¡LAS CLASES PARA ADULTOS SE OFRECEN EN INGLÉS O ESPAÑOL CUALQUIER TIEMPO!",
    spanishBannerNote: "Adult classes are offered in both English and Spanish, any time.",
    what: {
      title: "What is the Adult Course?",
      body: [
        `It is a ${adultCourse.hours} hour, TDLR (Texas Department of Licensing and Regulation) approved course, available for anyone ${adultCourse.minimumAge} or older.`,
      ],
      features: [
        "Separate adult classes so you don't have to take your driver's education class with teens",
        "Classes are offered in both English & Spanish",
        "You may take the written or computer test at our school",
        "Our state-of-the-art teaching practically guarantees your success!",
        "Community driving school vehicles available for driving practice",
      ],
    },
    when: {
      title: "When are Classes Held?",
      body: "Classes are offered every day, but timings may vary. Convenient locations all around greater Houston.",
    },
    roadTest: {
      title: "We Can Also Help You Take & Pass the DPS Road Test",
      body: `Once your course is complete, you can take your DPS-authorized road test with us at one of three locations, seven days a week.`,
      cta: "Learn about road tests",
    },
    cta: {
      title: "Call Us To Start Your Road to Becoming a Licensed Driver",
      body: "Ready to sign up? Give us a call and we will get you booked into the next available class.",
    },
  },

  roadTests: {
    metaTitle: "Authorized DPS Road Tests in Houston & Cypress",
    metaDescription: `DPS-authorized road tests at our Queenston, Eldridge and Barker Cypress locations, seven days a week. $${pricing.roadTest.price} with up to ${pricing.roadTest.attempts} chances to pass.`,
    hero: {
      eyebrow: "DPS authorized",
      title: "Authorized DPS Road Tests in Houston & Cypress!",
      subtitle: "DPS Authorized road tests are available at our Queenston, Eldridge, and Barker Cypress locations. We have openings 7 Days Per Week!",
    },
    price: {
      label: "The DPS-approved Road Test",
      amount: pricing.roadTest.price,
      note: `with up to ${pricing.roadTest.attempts} chances to pass`,
    },
    vehicles: {
      title: "Which vehicle can I use?",
      school: {
        title: "School vehicles",
        body: "Offered at no extra cost. Reserve in advance for guaranteed availability.",
      },
      personal: {
        title: "Personal vehicles",
        body: "Must have valid inspection and registration, front and back license plates, and proof of liability insurance.",
        items: [
          "Valid inspection and registration",
          "Front and back license plates",
          "Proof of liability insurance",
        ],
      },
    },
    requirements: {
      title: "What you need to bring",
      subtitle: "Requirements depend on your age. Find your group below.",
      groups: [
        {
          age: "Ages 16–17",
          items: [
            "Current DE-964 certificate showing minor driver education completion",
            "Valid learner's permit held for a minimum of 6 months",
            "Parental or guardian supervision required",
            "Impact Texas Teen Drivers (ITTD) video completion within 90 days",
          ],
        },
        {
          age: "Ages 18–24",
          items: [
            "Approved DE-964 or ADE-1317 from a driver education course",
            "Valid restricted driver's license",
            "Impact Texas Drivers video completion within 90 days",
          ],
        },
        {
          age: "Ages 25 and over",
          items: [
            "Legal Texas learner's license",
            "Impact Texas Drivers video completion within 90 days",
            "Exempt from taking driver's education",
          ],
        },
      ],
    },
    checklistTeaser: {
      title: "Not sure if you're ready?",
      body: "Work through our interactive checklist and know for certain before you turn up.",
      cta: "Open the readiness checklist",
    },
    cta: { title: "Call Us Now!", body: "Book your road test at Queenston, Eldridge or Barker Cypress." },
  },

  defensive: {
    metaTitle: "Defensive Driving Course in Houston & Cypress, TX",
    metaDescription:
      "Defensive driving in Houston and Cypress — dismiss a ticket, satisfy a court requirement or work toward an insurance discount.",
    hero: {
      eyebrow: "For all drivers",
      title: "Defensive Driving",
      subtitle: "Dismiss a ticket, satisfy a court requirement, or become a safer driver on Houston roads.",
    },
    body: [
      "Our defensive driving course is offered alongside our driver education programs for drivers who need to dismiss a citation, satisfy a court requirement, or simply want to sharpen their skills.",
      "Call us for current course dates, pricing and details on what your court or insurer requires.",
    ],
    reasons: {
      title: "Common reasons people take it",
      items: [
        { title: "Ticket dismissal", body: "Many Texas courts allow a defensive driving course to dismiss an eligible citation." },
        { title: "Insurance discount", body: "Some insurers offer a discount to drivers who complete an approved course." },
        { title: "Safer driving", body: "A refresher on hazard awareness, following distance and defensive technique." },
      ],
    },
    cta: { title: "Ask about defensive driving", body: "Call us for course dates and pricing." },
  },

  instructors: {
    metaTitle: "Driving Instructor Training & Careers | Cy Fair Driving School",
    metaDescription:
      "Instructor training, continuing education and contractor opportunities with Cy Fair Driving School in the greater Houston area.",
    hero: {
      eyebrow: "For instructors",
      title: "Build a career teaching people to drive",
      subtitle:
        "We offer instructor training courses, continuing education, and management and contractor opportunities across the greater Houston area.",
    },
    offerings: {
      title: "What we offer",
      items: [
        { title: "Instructor training courses", body: "Training for those looking to become certified driving instructors in Texas." },
        { title: "Continuing education", body: "Continuing education courses for instructors maintaining their certification." },
        { title: "Management opportunities", body: "Opportunities to take on management responsibility within the school." },
        { title: "Contractor opportunities", body: "Contract work for qualified, licensed driving instructors." },
      ],
    },
    why: {
      title: "Why teach with us",
      items: [
        "A steady stream of students across 28 communities",
        "Flexible scheduling — day, evening and weekend work",
        "A school that has been part of the Houston community since 2014",
      ],
    },
    cta: { title: "Interested in joining us?", body: "Call us or send your details and we'll be in touch." },
  },

  payments: {
    metaTitle: "Online Payments | Cy Fair Driving School",
    metaDescription: "Payment options for Cy Fair Driving School — credit and debit cards and Zelle.",
    hero: {
      eyebrow: "Payments",
      title: "Online Payments",
      subtitle: "Pay for your course or road test securely.",
    },
    body: "We accept major credit and debit cards as well as Zelle. Call us and we'll walk you through payment for your course, drive times or road test.",
    methodsTitle: "Accepted payment methods",
    note: "For payment details or to pay over the phone, call us.",
  },

  locations: {
    metaTitle: "Approved Road Test Locations | Cy Fair Driving School",
    metaDescription:
      "Our DPS-authorized road test locations in Houston: Queenston, Eldridge and Barker Cypress. Open seven days a week.",
    hero: {
      eyebrow: "Locations",
      title: "Approved Road Test Locations",
      subtitle: "DPS-authorized road tests at three locations across the greater Houston area, seven days a week.",
    },
    officeTitle: "Main office",
    testSitesTitle: "DPS-authorized road test locations",
    testSitesBody: "Road tests are available at all three locations, seven days a week. Call to reserve your slot and a school vehicle if you need one.",
    serviceAreaTitle: "Communities we serve",
    serviceAreaBody: "We teach students across the greater Houston area. Select your community to learn more.",
  },

  about: {
    metaTitle: "About Cy Fair Driving School | Houston & Cypress",
    metaDescription:
      "Cy Fair Driving School offers quality driver education and DPS road tests for teens and adults across the greater Houston area. Serving families since 2014.",
    hero: {
      eyebrow: "About us",
      title: "Quality driver education for Houston families",
      subtitle: `${business.name} offers quality driver education and DPS road tests for both teens and adult drivers across the greater Houston area.`,
    },
    story: {
      title: "Part of the Houston community since 2014",
      body: [
        "We opened our doors in 2014 with a simple goal: teach people to drive properly, and treat them well while we do it. Since then we have worked with teens taking their very first lesson, adults getting licensed later in life, and drivers who just needed someone patient in the passenger seat.",
        "Today we serve 28 communities across the greater Houston area, offer classes in English and Spanish, and conduct DPS-authorized road tests at three locations seven days a week.",
      ],
    },
    services: {
      title: "What we do",
      items: [
        "Teen driving classes",
        "Parent-taught driving options",
        "Adult driver education",
        "DPS road tests",
        "Defensive driving courses",
        "Continuing education courses",
        "Instructor training courses",
        "Management and contractor opportunities",
      ],
    },
    values: {
      title: "What we care about",
      items: [
        { title: "Patience", body: "Nervous drivers become confident drivers when someone takes the time. Our instructors do." },
        { title: "Accessibility", body: "Classes in English and Spanish, and one-on-one support for students with learning disabilities." },
        { title: "Flexibility", body: "Day, evening and weekend options, with plenty of drive time slots every day." },
      ],
    },
  },

  team: {
    metaTitle: "Meet the Team | Cy Fair Driving School",
    metaDescription: "Meet the instructors behind Cy Fair Driving School in Houston and Cypress.",
    hero: {
      eyebrow: "Our people",
      title: "Meet the Team",
      subtitle: "Certified Texas instructors who are patient, calm and genuinely good at this.",
    },
    body: "Our instructors are the reason students recommend us. They are certified, they are patient, and they build a real connection with the people they teach.",
    placeholderNotice:
      "Instructor profiles and photographs are being prepared. If you would like to know who will be teaching your course, give us a call and we'll tell you.",
  },

  reviews: {
    metaTitle: "Reviews | Cy Fair Driving School",
    metaDescription: "Read what students and parents say about Cy Fair Driving School in Houston and Cypress.",
    hero: { eyebrow: "Reviews", title: "What our students say", subtitle: "Reviews from our Google Business profile." },
    cta: { title: "Had a good experience?", body: "We would be grateful if you left us a review on Google." },
  },

  careers: {
    metaTitle: "Careers | Cy Fair Driving School",
    metaDescription: "Career and contractor opportunities with Cy Fair Driving School in the greater Houston area.",
    hero: {
      eyebrow: "Careers",
      title: "Work with us",
      subtitle: "We're always interested in hearing from certified instructors and people who want to become one.",
    },
    body: "We offer instructor training, continuing education, and management and contractor opportunities. If you are certified, or want to be, we would like to hear from you.",
  },

  contact: {
    metaTitle: "Contact Cy Fair Driving School | Houston & Cypress",
    metaDescription: `Call ${business.phone} or send us a message. ${fullAddress}.`,
    hero: {
      eyebrow: "Get in touch",
      title: "Request a class time",
      subtitle: "Tell us what you need and we'll call you back with times, pricing and the next available start date.",
    },
    form: {
      name: "Your name",
      namePlaceholder: "Jane Doe",
      phone: "Phone number",
      phonePlaceholder: "832-555-0123",
      email: "Email address",
      emailPlaceholder: "you@example.com",
      course: "Which course?",
      courseOptions: [
        "Teen drivers education",
        "Adult drivers education",
        "DPS road test",
        "Defensive driving",
        "Instructor training",
        "Something else",
      ],
      location: "Preferred location",
      locationPlaceholder: "Cypress, Katy, Houston…",
      message: "Anything else we should know?",
      messagePlaceholder: "Preferred days or times, questions, anything at all.",
      submit: "Send request",
      submitting: "Sending…",
      successTitle: "Thanks — we've got it.",
      successBody: "This is a demonstration site, so nothing has actually been sent. On the live site this would reach the school straight away and someone would call you back.",
      sendAnother: "Send another",
      errorRequired: "This field is required",
      errorPhone: "Please enter a valid phone number",
      errorEmail: "Please enter a valid email address",
      demoNotice: "Demo form — submissions are not sent anywhere yet.",
    },
    details: { title: "Contact details", callTitle: "Call us", visitTitle: "Visit us", followTitle: "Follow us" },
  },

  privacy: {
    metaTitle: "Privacy Policy | Cy Fair Driving School",
    metaDescription: "How Cy Fair Driving School handles the information you share with us.",
    hero: { eyebrow: "Legal", title: "Privacy Policy", subtitle: "How we handle the information you share with us." },
    sections: [
      {
        title: "Information we collect",
        body: "When you contact us through this website or by phone, we collect the details you choose to give us — typically your name, phone number, email address and the course you are interested in.",
      },
      {
        title: "How we use it",
        body: "We use your details to respond to your enquiry, book you into a class or road test, and keep you informed about your course. We do not sell your information.",
      },
      {
        title: "Sharing",
        body: "We share information only where it is necessary to deliver the service you have asked for, or where we are required to by law or by the Texas Department of Licensing and Regulation.",
      },
      {
        title: "Questions",
        body: `If you have any question about your information, call us on ${business.phone} or write to us at ${fullAddress}.`,
      },
    ],
    placeholderNotice:
      "This is placeholder policy text prepared for a demonstration site. Please have it reviewed before publishing.",
  },

  quiz: {
    metaTitle: "Find Your Course | Cy Fair Driving School",
    metaDescription: "Answer three quick questions and we'll recommend the right driver education course for you.",
    hero: {
      eyebrow: "Course finder",
      title: "Find your course",
      subtitle: "Three questions, about thirty seconds, and a clear answer at the end.",
    },
    questions: [
      {
        id: "age",
        question: "How old is the student?",
        options: [
          { value: "under18", label: "Under 18" },
          { value: "18to24", label: "18 to 24" },
          { value: "25plus", label: "25 or older" },
        ],
      },
      {
        id: "permit",
        question: "Do they already have a learner's permit?",
        options: [
          { value: "no", label: "Not yet" },
          { value: "yes", label: "Yes, they have one" },
          { value: "licensed", label: "They already have a license" },
        ],
      },
      {
        id: "goal",
        question: "What are they trying to do?",
        options: [
          { value: "license", label: "Get a driver's license" },
          { value: "roadtest", label: "Just take the road test" },
          { value: "ticket", label: "Dismiss a ticket or lower insurance" },
        ],
      },
    ],
    resultTitle: "Here's what we'd recommend",
    resultCta: "Request this class",
    resultCallCta: "Or call us",
    restart: "Start over",
    results: {
      teen: {
        name: "Teen Drivers Education",
        why: "Because the student is under 18 and working toward a license, they need the full TDLR-approved teen course — classroom hours plus behind-the-wheel and observation training.",
        href: "/teen-driving-classes",
      },
      adult: {
        name: "Adult Drivers Education",
        why: `Because the student is 18 or over, they can take our ${adultCourse.hours}-hour TDLR-approved adult course, held separately from teen classes and available in English or Spanish.`,
        href: "/adult-drivers-education",
      },
      roadTest: {
        name: "DPS Road Test",
        why: `It sounds like the student is ready to be tested. We conduct DPS-authorized road tests at three locations, seven days a week, for $${pricing.roadTest.price} with up to ${pricing.roadTest.attempts} chances to pass.`,
        href: "/road-tests",
      },
      defensive: {
        name: "Defensive Driving",
        why: "To dismiss a citation or work toward an insurance discount, our defensive driving course is the right fit.",
        href: "/defensive-driving",
      },
      adultExempt: {
        name: "DPS Road Test",
        why: "Drivers 25 and over are exempt from taking driver's education in Texas, so a road test with us may be all that's needed. Call us if you'd like practice hours first.",
        href: "/road-tests",
      },
    },
  },

  checklist: {
    metaTitle: "Texas Road Test Readiness Checklist | Cy Fair Driving School",
    metaDescription:
      "An interactive checklist of everything you need to bring to your Texas DPS road test, by age group. Know you're ready before you arrive.",
    hero: {
      eyebrow: "Before you arrive",
      title: "Road test readiness checklist",
      subtitle: "Tick your way through this before test day. Nobody enjoys being turned away over a missing document.",
    },
    pickAge: "First, how old is the driver?",
    ageGroups: [
      { value: "16to17", label: "16–17" },
      { value: "18to24", label: "18–24" },
      { value: "25plus", label: "25+" },
    ],
    vehicleTitle: "And whose vehicle will you use?",
    vehicleOptions: [
      { value: "school", label: "A school vehicle" },
      { value: "personal", label: "My own vehicle" },
    ],
    progressLabel: "ready",
    allSetTitle: "You're ready.",
    allSetBody: "Everything is ticked off. Call us to book your road test at Queenston, Eldridge or Barker Cypress.",
    notReadyTitle: "Nearly there",
    notReadyBody: "Tick everything above and you're good to go. Call us if you're unsure about any item.",
    schoolVehicleNote: "School vehicles are offered at no extra cost — reserve in advance for guaranteed availability.",
    resetLabel: "Reset checklist",
    printLabel: "Print this checklist",
  },

  serviceArea: {
    metaTitlePattern: "Driving School in {city}, TX | Cy Fair Driving School",
    metaDescriptionPattern:
      "Teen and adult drivers education, DPS road tests and defensive driving serving {city}, Texas. TDLR approved, classes in English and Spanish.",
    eyebrow: "Service area",
    titlePattern: "Driving School Serving {city}, Texas",
    subtitlePattern:
      "TDLR-approved teen and adult driver education, plus DPS-authorized road tests, for families in {city} and the surrounding area.",
    nearestTestSiteLabel: "Nearest road test location",
    servicesTitle: "What we offer in {city}",
    whyTitle: "Why {city} families choose us",
    otherAreasTitle: "Other communities we serve",
    ctaTitle: "Teaching drivers in {city} since 2014",
    ctaBody: "Call us to find the next class near you.",
    backToAll: "All service areas",
  },

  chatbot: {
    launcherLabel: "Chat with us",
    title: "Ask us anything",
    subtitle: "Answers about courses, road tests and pricing.",
    placeholder: "Type your question…",
    send: "Send",
    close: "Close chat",
    greeting:
      "Hi! I can answer questions about our courses, road tests and pricing. What would you like to know?",
    suggestionsLabel: "Popular questions",
    suggestions: [
      "What is the teen course?",
      "How much is a road test?",
      "Do you offer classes in Spanish?",
      "Where are you located?",
      "How do I sign up?",
    ],
    fallback:
      "I'm not certain about that one. Would you like to leave your details so someone from the school can call you back?",
    leadPrompt: "Sure — what's the best name and number to reach you on?",
    leadName: "Your name",
    leadPhone: "Phone number",
    leadSubmit: "Send to the school",
    leadSuccess:
      "Thanks! This is a demonstration site, so nothing has been sent. On the live site the school would receive this straight away.",
    leadCta: "Leave my details",
    callInstead: `Or call us on ${business.phone}`,
    demoBadge: "Demo",
    readMoreOn: "Read more on",
    typing: "Typing…",
  },

  footer: {
    tagline: "Safe Driving. Bright Future.",
    blurb:
      "TDLR-approved driver education and DPS-authorized road tests for teens and adults across the greater Houston area.",
    coursesTitle: "Courses",
    companyTitle: "Company",
    contactTitle: "Contact",
    areasTitle: "Service areas",
    rightsReserved: "All rights reserved.",
    poweredBy: "Powered by",
    privacy: "Privacy Policy",
    languageLabel: "Language",
    imageNotice: "Photography is illustrative.",
  },

  notFound: {
    metaTitle: "Page not found | Cy Fair Driving School",
    title: "We couldn't find that page",
    body: "The page you're looking for may have moved. Try one of these instead, or give us a call.",
    home: "Back to home",
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
      quote:
        "The instructors I've had were very calm and patient with me, which made me less nervous…",
      source: "Google",
    },
    {
      name: "Syed Fahad",
      quote:
        "I had a great experience at Cyfair driving school. Mohammed Hoque is the best instructor…",
      source: "Google",
    },
  ],
};

/**
 * The shape every locale must satisfy. Because `en` is not `as const`, its
 * literal types widen to `string`/`number`, so `es` is checked for structural
 * parity — a missing or misnamed key is a compile error, not a runtime blank.
 */
export type Dictionary = typeof en;
