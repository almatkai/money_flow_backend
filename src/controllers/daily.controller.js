// src/controllers/daily.controller.js
const { Daily, ExpenseCategory } = require('../models');

async function createDaily(req, res) {
  try {
    const { user_id, name, price, description, image, category_id } = req.body;
    
    // Verify category exists
    const category = await ExpenseCategory.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ error: 'Invalid category_id' });
    }

    const daily = await Daily.create({ 
      user_id, 
      name, 
      price, 
      description, 
      image, 
      category_id 
    });
    
    // Include category in response
    const dailyWithCategory = await Daily.findByPk(daily.id, {
      include: [{
        model: ExpenseCategory,
        attributes: ['label', 'value']
      }]
    });

    res.status(201).json(dailyWithCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getDailies(req, res) {
  try {
    const { user_id } = req.query;
    const where = user_id ? { user_id } : {};
    const dailies = await Daily.findAll({
      where,
      include: [{
        model: ExpenseCategory,
        attributes: ['label', 'value']
      }]
    });
    res.json(dailies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteDaily(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Daily.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Daily record deleted' });
    } else {
      res.status(404).json({ error: 'Daily record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateDaily(req, res) {
  try {
    const { id } = req.params;
    const { price, name, category_id } = req.body;

    // If category_id is being updated, verify it exists
    if (category_id) {
      const category = await ExpenseCategory.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ error: 'Invalid category_id' });
      }
    }

    const [updated] = await Daily.update(
      { price, name, category_id },
      { where: { id } }
    );

    if (updated) {
      const updatedDaily = await Daily.findByPk(id, {
        include: [{
          model: ExpenseCategory,
          attributes: ['label', 'value']
        }]
      });
      res.json(updatedDaily);
    } else {
      res.status(404).json({ error: 'Daily record not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createDaily,
  getDailies,
  deleteDaily,
  updateDaily,
};
