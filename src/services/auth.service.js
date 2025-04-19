const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, VerificationToken } = require('../models');
const { sendVerificationEmail } = require('../utils/email');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

class AuthService {
  async registerUser({ email, password, name }) {
    const transaction = await sequelize.transaction();
    
    try {
      // Check if user exists (within transaction)
      const existingUser = await User.findOne({ 
        where: { email },
        transaction
      });
      
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create user (within transaction)
      const user = await User.create({ 
        email, 
        password, 
        name,
        emailVerified: false 
      }, { transaction });

      // Create verification token (within transaction)
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await VerificationToken.create({
        userId: user.id,
        token,
        type: 'email_verification',
        expiresAt
      }, { transaction });

      // Send email (outside transaction as it's not database-related)
      await sendVerificationEmail(user.email, token);
      
      // Commit transaction
      await transaction.commit();

      return { 
        message: 'Registration successful',
        user: { id: user.id, email: user.email, name: user.name } 
      };
    } catch (error) {
      // Rollback all changes if anything fails
      await transaction.rollback();
      throw error;
    }
  }

  async verifyEmail(token) {
    const transaction = await sequelize.transaction();
    
    try {
      const verificationToken = await VerificationToken.findOne({
        where: {
          token,
          type: 'email_verification',
          expiresAt: {
            [Op.gt]: new Date()
          }
        },
        transaction
      });

      if (!verificationToken) {
        throw new Error('Invalid or expired verification token');
      }

      // Update user's email verification status
      await User.update(
        {
          emailVerified: true,
          emailVerifiedAt: new Date()
        },
        {
          where: { id: verificationToken.userId },
          transaction
        }
      );

      // Delete the used token
      await verificationToken.destroy({ transaction });

      await transaction.commit();
      return { message: 'Email verified successfully' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async loginUser({ email, password }) {
    const transaction = await sequelize.transaction();
    
    try {
      const user = await User.findOne({ 
        where: { email },
        transaction
      });
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      if (!user.emailVerified) {
        const error = new Error('Please verify your email before logging in');
        error.needsVerification = true;
        throw error;
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );

      await transaction.commit();
      return { token, user: { id: user.id, email: user.email, name: user.name } };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async resendVerification(email) {
    const transaction = await sequelize.transaction();
    
    try {
      const user = await User.findOne({ 
        where: { email },
        transaction
      });
      
      if (!user) {
        throw new Error('User not found');
      }

      if (user.emailVerified) {
        throw new Error('Email is already verified');
      }

      // Delete any existing verification tokens
      await VerificationToken.destroy({
        where: {
          userId: user.id,
          type: 'email_verification'
        },
        transaction
      });

      // Generate new verification token
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await VerificationToken.create({
        userId: user.id,
        token,
        type: 'email_verification',
        expiresAt
      }, { transaction });

      // Send verification email
      await sendVerificationEmail(user.email, token);

      await transaction.commit();
      return { message: 'Verification email sent successfully' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async handleGoogleCallback(userId) {
    const transaction = await sequelize.transaction();
    
    try {
      await User.update(
        {
          emailVerified: true,
          emailVerifiedAt: new Date()
        },
        {
          where: { id: userId },
          transaction
        }
      );

      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
      );

      await transaction.commit();
      return { token };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new AuthService(); 