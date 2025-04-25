const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');
const { logger } = require('sequelize/lib/utils/logger');

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;
      const result = await authService.registerUser({ email, password, name });
      
      res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      const result = await authService.verifyEmail(token);
      res.json(result);
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Error verifying email' });
    }
  }

  async login(req, res) {
    try {
      console.debug('Login request body:', req.body);
      const { email, password } = req.body;
      const result = await authService.loginUser({ email, password });
      res.json(result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  async resendVerification(req, res) {
    try {
      const { email } = req.body;
      const result = await authService.resendVerification(email);
      res.json(result);
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ message: 'Error resending verification email' });
    }
  }

  async googleCallback(req, res) {
    try {
      const result = await authService.handleGoogleCallback(req.user.id);
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${result.token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }
}

module.exports = new AuthController();