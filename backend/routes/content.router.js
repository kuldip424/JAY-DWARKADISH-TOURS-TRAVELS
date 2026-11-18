import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import protectAdmin from '../middlewares/protectAdmin.js';
import { getPackages, getPlaces, postSeed } from '../controllers/content.controller.js';

const router = express.Router();

router.get('/places', getPlaces);
router.get('/packages', getPackages);
router.post('/seed', protectRoute, protectAdmin, postSeed); // wipes and re-creates content

export default router;
