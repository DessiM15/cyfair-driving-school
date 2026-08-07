/**
 * Service-area cities, taken verbatim from the current site's coverage list.
 * Each becomes a static landing page at /service-areas/[slug] (and /es/...).
 *
 * `tier: "primary"` cities get richer copy and appear in the homepage map legend.
 */

export type City = {
  slug: string;
  name: string;
  tier: "primary" | "standard";
  /** Approximate center, used to place the marker on the coverage map. */
  lat: number;
  lng: number;
  /** Nearest DPS-authorized road test site we operate. */
  nearestTestSite: string;
};

export const cities: City[] = [
  { slug: "cypress", name: "Cypress", tier: "primary", lat: 29.9691, lng: -95.6972, nearestTestSite: "Barker Cypress" },
  { slug: "katy", name: "Katy", tier: "primary", lat: 29.7858, lng: -95.8245, nearestTestSite: "Barker Cypress" },
  { slug: "houston", name: "Houston", tier: "primary", lat: 29.7604, lng: -95.3698, nearestTestSite: "Queenston" },
  { slug: "tomball", name: "Tomball", tier: "primary", lat: 30.0972, lng: -95.6161, nearestTestSite: "Queenston" },
  { slug: "spring", name: "Spring", tier: "primary", lat: 30.0799, lng: -95.4172, nearestTestSite: "Queenston" },
  { slug: "the-woodlands", name: "The Woodlands", tier: "primary", lat: 30.1658, lng: -95.4613, nearestTestSite: "Queenston" },
  { slug: "alief", name: "Alief", tier: "standard", lat: 29.7075, lng: -95.5877, nearestTestSite: "Eldridge" },
  { slug: "barker", name: "Barker", tier: "standard", lat: 29.7799, lng: -95.6919, nearestTestSite: "Barker Cypress" },
  { slug: "baytown", name: "Baytown", tier: "standard", lat: 29.7355, lng: -94.9774, nearestTestSite: "Queenston" },
  { slug: "bellaire", name: "Bellaire", tier: "standard", lat: 29.7058, lng: -95.4588, nearestTestSite: "Eldridge" },
  { slug: "channelview", name: "Channelview", tier: "standard", lat: 29.7763, lng: -95.1152, nearestTestSite: "Queenston" },
  { slug: "crosby", name: "Crosby", tier: "standard", lat: 29.9111, lng: -95.0619, nearestTestSite: "Queenston" },
  { slug: "deer-park", name: "Deer Park", tier: "standard", lat: 29.7052, lng: -95.1238, nearestTestSite: "Queenston" },
  { slug: "fairbanks", name: "Fairbanks", tier: "standard", lat: 29.8663, lng: -95.5183, nearestTestSite: "Queenston" },
  { slug: "galena-park", name: "Galena Park", tier: "standard", lat: 29.7413, lng: -95.2305, nearestTestSite: "Queenston" },
  { slug: "highlands", name: "Highlands", tier: "standard", lat: 29.8177, lng: -95.0533, nearestTestSite: "Queenston" },
  { slug: "hockley", name: "Hockley", tier: "standard", lat: 30.0355, lng: -95.8377, nearestTestSite: "Barker Cypress" },
  { slug: "huffman", name: "Huffman", tier: "standard", lat: 30.0263, lng: -95.0910, nearestTestSite: "Queenston" },
  { slug: "hufsmith", name: "Hufsmith", tier: "standard", lat: 30.1094, lng: -95.5794, nearestTestSite: "Queenston" },
  { slug: "humble", name: "Humble", tier: "standard", lat: 29.9988, lng: -95.2622, nearestTestSite: "Queenston" },
  { slug: "kingwood", name: "Kingwood", tier: "standard", lat: 30.0505, lng: -95.1810, nearestTestSite: "Queenston" },
  { slug: "la-porte", name: "La Porte", tier: "standard", lat: 29.6658, lng: -95.0191, nearestTestSite: "Queenston" },
  { slug: "north-houston", name: "North Houston", tier: "standard", lat: 29.9377, lng: -95.4194, nearestTestSite: "Queenston" },
  { slug: "pasadena", name: "Pasadena", tier: "standard", lat: 29.6911, lng: -95.2091, nearestTestSite: "Queenston" },
  { slug: "seabrook", name: "Seabrook", tier: "standard", lat: 29.5638, lng: -95.0233, nearestTestSite: "Queenston" },
  { slug: "south-houston", name: "South Houston", tier: "standard", lat: 29.6633, lng: -95.2372, nearestTestSite: "Queenston" },
  { slug: "waller", name: "Waller", tier: "standard", lat: 30.0577, lng: -95.9277, nearestTestSite: "Barker Cypress" },
  { slug: "webster", name: "Webster", tier: "standard", lat: 29.5377, lng: -95.1183, nearestTestSite: "Queenston" },
];

export const primaryCities = cities.filter((c) => c.tier === "primary");

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
