'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Petition, { foreignKey: 'authorId' })
      
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'User.email already registered'
      },
      validate: {
        notNull: {
          msg: 'User.email cannot be null'
        },
        notEmpty: {
          msg: 'User.email cannot be empty'
        },
        isEmail: {
          msg: 'Must be email formatted'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User.password cannot be null'
        },
        notEmpty: {
          msg: 'User.password cannot be empty'
        },
        len: {
          args: [5, 20],
          msg: 'Password length must between 5 and 20'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPass(user.password)
        if (!user.username) {
          user.username = user.email.split('@')[0]
        }        
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};