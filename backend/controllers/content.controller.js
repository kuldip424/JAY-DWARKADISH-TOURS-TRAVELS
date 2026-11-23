import { listPackages, listPlaces, seedContent } from '../services/content/content.service.js';

// GET /api/content/places
export const getPlaces = async (req, res) => {
  const places = await listPlaces();
  res.json({ success: true, places });
};

// GET /api/content/packages
export const getPackages = async (req, res) => {
  const packages = await listPackages();
  res.json({ success: true, packages });
};

// POST /api/content/seed (admin)
export const postSeed = async (req, res) => {
  const places = await seedContent();
  res.json({ success: true, message: 'Content seeded successfully', places });
};
