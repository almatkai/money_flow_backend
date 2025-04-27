const { Model, DataTypes } = require('sequelize');

class Daily extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          validate: {
            min: 0
          }
        },
        description: {
          type: DataTypes.STRING(255)
        },
        image: {
          type: DataTypes.TEXT
        },
        category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'expense_categories',
            key: 'id'
          }
        }
      },
      {
        sequelize,
        modelName: 'Daily',
        tableName: 'daily',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
    );
  }

  static associate(models) {
    Daily.belongsTo(models.User, {
      foreignKey: 'user_id'
    });

    Daily.belongsTo(models.ExpenseCategory, {
      foreignKey: 'category_id',
      as: 'category'
    });
  }
}

module.exports = Daily;
