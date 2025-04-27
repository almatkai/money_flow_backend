const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = config.sequelize;

// Import models
const User = require('./user.model');
const Profile = require('./profile.model');
const VerificationToken = require('./verification-token.model');
const ExpenseCategory = require('./expense-category.model');
const Daily = require('./daily.model');
const Wish = require('./wish.model');

// Initialize models
const models = {
  User: User.init(sequelize),
  Profile: Profile.init(sequelize),
  VerificationToken: VerificationToken.init(sequelize),
  ExpenseCategory: ExpenseCategory.init(sequelize),
  Daily: Daily.init(sequelize),
  Wish: Wish.init(sequelize)
};

// Run associations if any
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models,
};
