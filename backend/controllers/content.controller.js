import { listPackages, listPlaces, seedContent } from '../services/content/content.service.js';
import sendError from '../utils/sendError.js';

// GET /api/content/places
export const getPlaces = async (req, res) => {
  try {
    const places = await listPlaces();
    res.json({ success: true, places });
  } catch (e) {
    sendError(res, e);
  }
};

// GET /api/content/packages
export const getPackages = async (req, res) => {
  try {
    const packages = await listPackages();
    res.json({ success: true, packages });
  } catch (e) {
    sendError(res, e);
  }
};

// POST /api/content/seed (admin)
export const postSeed = async (req, res) => {
  try {
    const places = await seedContent();
    res.json({ success: true, message: 'Content seeded successfully', places });
  } catch (e) {
    sendError(res, e);
  }
};
