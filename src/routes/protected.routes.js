const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth.middleware');

// Import controllers
const userProfileController = require('../controllers/userprofile.controller');
const wishController = require('../controllers/wish.controller');
const dailyController = require('../controllers/daily.controller');
const { ExpenseCategory } = require('../models');

// User profile routes
router.get('/profile', authMiddleware, userProfileController.getProfile);
router.put('/profile', authMiddleware, userProfileController.updateProfile);

// Dashboard route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Dashboard data',
    timestamp: new Date()
  });
});

// Wish routes
router.post('/wishes', authMiddleware, wishController.createWish);
router.get('/wishes', authMiddleware, wishController.getWishes);
router.put('/wishes/:id', authMiddleware, wishController.updateWish);
router.delete('/wishes/:id', authMiddleware, wishController.deleteWish);

// Daily expense routes
router.post('/daily', authMiddleware, dailyController.createDaily);
router.get('/daily', authMiddleware, dailyController.getDailies);
router.put('/daily/:id', authMiddleware, dailyController.updateDaily);
router.delete('/daily/:id', authMiddleware, dailyController.deleteDaily);

// Category routes
router.get('/categories', authMiddleware, async (req, res) => {
  try {
    const categories = await ExpenseCategory.findAll({
      order: [['id', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/categories/:id', authMiddleware, async (req, res) => {
  try {
    const category = await ExpenseCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
