import httpError from '../../utils/httpError.js';
import { PACKAGE_PRICES } from '../../config/pricing.js';
import {
  deleteAllPackages,
  deleteAllPlaces,
  findPackages,
  findPackagesWithPlaces,
  findPlaces,
  insertPackages,
  insertPlaces,
} from '../../repositories/content/content.repository.js';

// The places shown on the website. Images are file names under client/src/assets.
const PLACES = [
  {
    slug: 'dwarka-mandir',
    title: 'Dwarkadhish Mandir',
    subtitle: 'The Main Temple of Dwarka',
    description:
      'The Dwarkadhish Temple, also known as Jagat Mandir, is a 2500+ year old temple dedicated to Lord Krishna. The 5-storey structure stands on 72 pillars and features intricate carvings. One of the Char Dham pilgrimage sites.',
    image: 'dwarka-mandir.png',
    details: [
      { icon: 'mdi:clock-outline', label: 'Darshan Timings', value: '6:30 AM – 1:00 PM, 5:00 PM – 9:30 PM' },
      { icon: 'mdi:calendar-star', label: 'Best Time', value: 'Janmashtami (Aug/Sep)' },
      { icon: 'mdi:walk', label: 'From City Center', value: 'Walking distance' },
    ],
  },
  {
    slug: 'gomti-ghat',
    title: 'Gomti Ghat',
    subtitle: 'Sacred River Confluence',
    description:
      'Gomti Ghat is where the sacred Gomti River meets the Arabian Sea. Pilgrims take a holy dip here before visiting the Dwarkadhish Temple. The evening aarti is a mesmerizing experience with hundreds of floating diyas.',
    image: 'gomti-ghat.png',
    details: [
      { icon: 'mdi:weather-sunset', label: 'Evening Aarti', value: 'Sunset (6:00 – 7:00 PM)' },
      { icon: 'mdi:swim', label: 'Holy Dip', value: 'Safe bathing ghats' },
      { icon: 'mdi:walk', label: 'From Mandir', value: '5 min walk' },
    ],
  },
  {
    slug: 'nageshwar',
    title: 'Nageshwar Jyotirling',
    subtitle: 'One of the 12 Jyotirlingas',
    description:
      'Nageshwar is one of the 12 sacred Jyotirlinga shrines of Lord Shiva. Located 18 km from Dwarka on the route to Bet Dwarka. The temple features a massive 80-foot statue of Lord Shiva.',
    image: 'nageshwar.jpg',
    details: [
      { icon: 'mdi:clock-outline', label: 'Temple Timings', value: '6:00 AM – 9:00 PM' },
      { icon: 'mdi:car', label: 'From Dwarka', value: '18 km (30 min)' },
      { icon: 'mdi:star', label: 'Significance', value: 'One of 12 Jyotirlingas' },
    ],
  },
  {
    slug: 'bet-dwarka',
    title: 'Bet Dwarka',
    subtitle: 'Island of Lord Krishna',
    description:
      'Bet Dwarka is an island in the Arabian Sea, believed to be the original residence of Lord Krishna. Accessible by the iconic Sudarshan Setu bridge or a short ferry ride from Okha. The island houses the Dwarkadhish Temple and beautiful beaches.',
    image: 'bet-dwarka.png',
    details: [
      { icon: 'mdi:bridge', label: 'Access', value: 'Sudarshan Setu Bridge' },
      { icon: 'mdi:ferry', label: 'Ferry', value: 'Okha jetty – 15 min' },
      { icon: 'mdi:car', label: 'From Dwarka', value: '30 km to Okha (45 min)' },
      { icon: 'mdi:clock-outline', label: 'Best Time', value: 'Morning (before 11 AM)' },
    ],
  },
  {
    slug: 'gopi-talav',
    title: 'Gopi Talav',
    subtitle: 'Sacred Pond of the Gopis',
    description:
      'Gopi Talav is a sacred pond about 20 km from Dwarka. According to legend, this is where Lord Krishna met the Gopis. The yellow sand (Gopi Chandan) is used for tilak by devotees.',
    image: 'gopi-talav.jpg',
    details: [
      { icon: 'mdi:car', label: 'From Dwarka', value: '20 km (30 min)' },
      { icon: 'mdi:hand-pointing-right', label: 'Special', value: 'Gopi Chandan' },
      { icon: 'mdi:clock-outline', label: 'Duration', value: '30-45 min' },
    ],
  },
  {
    slug: 'rukhmani',
    title: 'Rukhmaniji Mandir',
    subtitle: 'Temple of Rukmini Devi',
    description:
      'The Rukmini Temple is dedicated to Rukmini Devi, chief consort of Lord Krishna. Located 2 km from the Dwarkadhish Temple, this 2500-year-old temple features beautiful carvings and is one of the finest in Gujarat.',
    image: 'rukmini-temple.png',
    details: [
      { icon: 'mdi:car', label: 'From Mandir', value: '2 km (5 min)' },
      { icon: 'mdi:clock-outline', label: 'Timings', value: '6 AM–12 PM, 4–8 PM' },
      { icon: 'mdi:information', label: 'Note', value: 'Separate from the main temple' },
    ],
  },
  {
    slug: 'bhadkeshwar',
    title: 'Bhadkeshwar Mahadev',
    subtitle: 'Seaside Shiva Temple',
    description:
      'Bhadkeshwar Mahadev Temple is on a hillock near the seashore, offering stunning views of the Arabian Sea. During high tide, the temple becomes partially surrounded by water, creating a magical scene. Best visited during sunset.',
    image: 'bhadkeshwar.png',
    details: [
      { icon: 'mdi:walk', label: 'From Mandir', value: '1.5 km (walkable)' },
      { icon: 'mdi:weather-sunset', label: 'Best Time', value: 'Sunset' },
      { icon: 'mdi:waves', label: 'High Tide', value: 'Partially surrounded by sea' },
    ],
  },
  {
    slug: 'shivrajpur',
    title: 'Shivrajpur Beach',
    subtitle: 'Blue Flag Certified Beach',
    description:
      "Shivrajpur Beach is one of India's Blue Flag certified beaches, known for pristine white sand and crystal clear water. Located 12 km from Dwarka, it's perfect for swimming and relaxing. A must-visit for beach lovers.",
    image: 'shivrajpur.png',
    details: [
      { icon: 'mdi:car', label: 'From Dwarka', value: '12 km (20 min)' },
      { icon: 'mdi:flag', label: 'Certification', value: 'Blue Flag (International)' },
      { icon: 'mdi:swim', label: 'Activities', value: 'Swimming, sunset' },
      { icon: 'mdi:clock-outline', label: 'Best Time', value: '4:00 PM – 6:30 PM' },
    ],
  },
];

// Prices come from config/pricing.js — the same list bookings are charged from.
const PACKAGES = [
  {
    title: 'Dwarka Local Darshan',
    description: 'All the main temples and ghats of Dwarka city in one day.',
    duration: '1 Day',
    image: 'local-darshan.jpg',
    placeSlugs: ['dwarka-mandir', 'gomti-ghat', 'bhadkeshwar', 'rukhmani'],
  },
  {
    title: 'Complete Dwarka Tour',
    description: 'Dwarka city plus Nageshwar Jyotirling and Bet Dwarka island.',
    duration: '1 Day',
    image: 'complete-tour.webp',
    placeSlugs: ['dwarka-mandir', 'gomti-ghat', 'nageshwar', 'bet-dwarka', 'rukhmani'],
  },
  {
    title: 'Dwarka + Somnath Yatra',
    description: 'Two Jyotirlinga darshans with comfortable overnight travel.',
    duration: '2 Days',
    image: 'somnath.png',
    placeSlugs: ['dwarka-mandir', 'nageshwar', 'bet-dwarka'],
  },
  {
    title: 'Dwarka Beach & Temple',
    description: 'Temple darshan in the morning, Blue Flag beach in the evening.',
    duration: '1 Day',
    image: 'beach.jpg',
    placeSlugs: ['dwarka-mandir', 'shivrajpur', 'bhadkeshwar'],
  },
  {
    title: 'Nageshwar Jyotirling',
    description: 'A short trip to the Jyotirlinga and Gopi Talav.',
    duration: 'Half Day',
    image: 'nageshwar.jpg',
    placeSlugs: ['nageshwar', 'gopi-talav'],
  },
];

// Packages store place ids, so they can only be built once the places are saved
const buildPackages = (savedPlaces) => {
  const idBySlug = Object.fromEntries(savedPlaces.map((place) => [place.slug, place._id]));
  return PACKAGES.map(({ placeSlugs, ...pkg }) => ({
    ...pkg,
    price: PACKAGE_PRICES[pkg.title],
    places: placeSlugs.map((slug) => idBySlug[slug]).filter(Boolean),
  }));
};

export const listPlaces = () => findPlaces();

export const listPackages = () => findPackagesWithPlaces();

// Replaces all places and packages with the content above. Returns the number of places.
// Switched off unless ALLOW_CONTENT_SEED=true, because it deletes whatever is there now.
export const seedContent = async () => {
  if (process.env.ALLOW_CONTENT_SEED !== 'true') {
    throw httpError(403, 'Seeding is turned off. Set ALLOW_CONTENT_SEED=true to allow it.');
  }

  // Kept in memory so a failed seed can put the old content back
  const oldPlaces = await findPlaces();
  const oldPackages = await findPackages();

  await deleteAllPlaces();
  await deleteAllPackages();

  try {
    const savedPlaces = await insertPlaces(PLACES);
    await insertPackages(buildPackages(savedPlaces));
    return savedPlaces.length;
  } catch (e) {
    // Clear the half-written content first, or the old slugs clash with the new ones
    await deleteAllPlaces();
    await deleteAllPackages();
    await insertPlaces(oldPlaces);
    await insertPackages(oldPackages);
    throw e;
  }
};
