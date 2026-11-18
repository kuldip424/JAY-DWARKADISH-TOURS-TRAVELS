const express = require('express');
const router = express.Router();
const { getPlaces, getPackages, seedContent } = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

router.get('/places', getPlaces);
router.get('/packages', getPackages);
router.post('/seed', protect, seedContent); // Usually admin only, but for now protect is fine

module.exports = router;
