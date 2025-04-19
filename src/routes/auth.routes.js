const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
];

// Register new user
router.post('/register', validateRegistration, authController.register);

// Verify email
router.get('/verify-email/:token', authController.verifyEmail);

// Login user
router.post('/login', authController.login);

// Resend verification email
router.post('/resend-verification', authController.resendVerification);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

module.exports = router; 