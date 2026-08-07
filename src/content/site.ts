/**
 * Locale-independent facts about the business.
 *
 * Everything here is sourced from cyfairdrivingschool.com. Nothing in this file
 * is invented. Items marked NEEDS-CONFIRMATION are inconsistent on the live site
 * and should be verified by the owner before launch.
 */

export const SITE_URL = "https://www.cyfairdrivingschool.com";

export const business = {
  name: "Cy Fair Driving School",
  shortName: "Cy Fair Driving",
  legalName: "Cy Fair Driving School",
  foundedYear: 2014,

  phone: "832-632-8855",
  phoneHref: "tel:+18326328855",
  phoneAlt: "832-326-5628",
  phoneAltHref: "tel:+18323265628",

  address: {
    street: "17036 West Little York Road",
    suite: "Suite 500",
    city: "Houston",
    region: "TX",
    regionName: "Texas",
    postalCode: "77084",
    country: "US",
  },

  /** Approximate coordinates for 17036 West Little York Rd, Houston TX 77084. */
  geo: { lat: 29.8637, lng: -95.6402 },

  social: {
    facebook: "https://www.facebook.com/cyfairdrivingschool",
    google: "https://www.google.com/search?q=Cy+Fair+Driving+School+Houston",
  },

  /** Partner site that hosts the fully online course. */
  onlineCoursePartner: {
    name: "ABC Online Driving",
    url: "https://www.abconlinedriving.com",
  },

  agency: {
    name: "Smart Scale",
    url: "https://smartscaleagent.com",
  },
} as const;

export const fullAddress = `${business.address.street}, ${business.address.suite}, ${business.address.city}, ${business.address.region} ${business.address.postalCode}`;

/** DPS-authorized road test sites. */
export const roadTestSites = ["Queenston", "Eldridge", "Barker Cypress"] as const;

/**
 * Pricing. Only the road test price is published on the current site; the rest
 * are deliberately "call for pricing" until the owner supplies real numbers.
 * Set a `price` value here and the UI renders it automatically.
 */
export const pricing = {
  roadTest: { price: 75, attempts: 3 },
  teenCourse: { price: null as number | null },
  adultCourse: { price: null as number | null },
  defensiveDriving: { price: null as number | null },
} as const;

/**
 * Course structure.
 *
 * NEEDS-CONFIRMATION: the live site states "a 26 hour course, which is separated
 * into 24 hours in the classroom and 14 hours of in-car training." 24 + 14 = 38,
 * so the stated total is not consistent with its own components. We publish only
 * the components, which are individually plausible under TDLR minor driver
 * education rules, and omit a total until the owner confirms it.
 */
export const teenCourse = {
  classroomHours: 24,
  inCarHours: 14,
  behindTheWheelHours: 7,
  observationHours: 7,
  permitTestAfterHours: 6,
  newClassEveryWeeks: 2,
} as const;

export const adultCourse = {
  hours: 6,
  minimumAge: 18,
} as const;

export const paymentMethods = ["Visa", "Mastercard", "Discover", "American Express", "Zelle"] as const;
