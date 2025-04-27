const jwt = require('jsonwebtoken');
const { User } = require('../models');
const i18next = require('../utils/i18');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Find user
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    // Expired token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: i18next.t('error.tokenExpired') });
    }

    // Any other JWT error (invalid, malformed, etc)
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: i18next.t('error.tokenInvalid') });
    }

    // Fallback
    return res.status(500).json({ message: i18next.t('error.internal') });
  }
};

module.exports = authMiddleware;