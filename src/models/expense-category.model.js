const { Model, DataTypes } = require('sequelize');

class ExpenseCategory extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        label: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        value: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        }
      },
      {
        sequelize,
        modelName: 'ExpenseCategory',
        tableName: 'expense_categories',
        timestamps: false
      }
    );
  }

  static associate(models) {
    ExpenseCategory.hasMany(models.Daily, {
      foreignKey: 'category_id',
      as: 'dailyExpenses'
    });
    
    ExpenseCategory.hasMany(models.Wish, {
      foreignKey: 'category_id',
      as: 'wishes'
    });
  }
}

module.exports = ExpenseCategory;
