const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const analyticsController = require('../controllers/analyticsController');

// Core Pages
router.get('/', pageController.renderHome);
router.get('/health', pageController.healthCheck);

// API Routes
router.post('/api/track/visit', analyticsController.trackVisit);
router.post('/api/track/click', analyticsController.clickEvent);

module.exports = router;
