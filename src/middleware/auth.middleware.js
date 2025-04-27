const jwt = require('jsonwebtoken');
const { User } = require('../models');

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
    // expired token
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ message: translate('error.tokenExpired', 'Your session has expired.') });
    }

    // any other JWT error (invalid, malformed, etc)
    if (error.name === 'JsonWebTokenError') {
      return res
        .status(401)
        .json({ message: translate('error.tokenInvalid', 'Token is not valid.') });
    }

    // fallback
    return res
      .status(500)
      .json({ message: translate('error.internal', 'Internal server error.') });
  }
};

module.exports = authMiddleware; 