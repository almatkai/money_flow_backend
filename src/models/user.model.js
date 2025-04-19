const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true, // Allow null for Google OAuth users
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        googleId: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
          field: 'google_id',
        },
        picture: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        emailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          field: 'email_verified',
        },
        emailVerifiedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'email_verified_at',
        },
        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        hooks: {
          beforeSave: async (user) => {
            if (user.changed('password') && user.password) {
              user.password = await bcrypt.hash(user.password, 12);
            }
          },
        },
      }
    );
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }

  static associate(models) {
    this.hasMany(models.VerificationToken, {
      foreignKey: 'userId',
      as: 'verificationTokens',
    });
  }
}

module.exports = User; 