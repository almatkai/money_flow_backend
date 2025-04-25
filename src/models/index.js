const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = config.sequelize;

// Import models
const User = require('./user.model');
const Profile = require('./profile.model');
const VerificationToken = require('./verification-token.model');

// Initialize models
const models = {
  User: User.init(sequelize),
  Profile: Profile.init(sequelize),
  VerificationToken: VerificationToken.init(sequelize),
};

// Run associations if any
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models,
}; 