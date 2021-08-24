'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Class, { foreignKey: 'TeacherId' })
    }
  };
  Teacher.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Email cannot be null' },
        notEmpty: { msg: 'Email cannot be Empty' },
        isEmail: { msg: 'Must be email format' }
      }
    },
    password: {
      type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password cannot be null' },
        notEmpty: { msg: 'Password cannot be Empty' }
      }
    },
    name: {
      type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name cannot be null' },
        notEmpty: { msg: 'Name cannot be Empty' }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Phone Number cannot be null' },
        notEmpty: { msg: 'Phone Number cannot be Empty' }
      }
    },
    role: {
      type: DataTypes.STRING,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'role cannot be null' },
        notEmpty: { msg: 'role cannot be Empty' }
      }
    }
  }, {
    hooks: {
      beforeCreate: teacher => {
        teacher.password = hashPassword(teacher.password)
      }
    },
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};