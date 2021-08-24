'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Class, { through: 'StudentClasses' })
      Student.hasMany(models.StudentClass, { foreignKey: 'StudentId' })
    }
  };
  Student.init({
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
      beforeCreate: student => {
        student.password = hashPassword(student.password)
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};