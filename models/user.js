'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Farm)
      User.hasMany(models.Form)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email address already exist'
      },
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        },
        notNull: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'email must be in email format'
        }
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'phone number cannot be empty'
        },
        notNull: {
          msg: 'phone number cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty'
        },
        notNull: {
          msg: 'password cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};