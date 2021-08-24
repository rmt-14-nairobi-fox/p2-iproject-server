'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Teacher, { foreignKey: 'TeacherId' })
      Class.belongsToMany(models.Student, { through: 'StudentClasses' })
      Class.hasMany(models.StudentClass, { foreignKey: 'ClassId', as: 'aliasClass' })
    }
  };
  Class.init({
    TeacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Teacher Id cannot be null' },
        notEmpty: { msg: 'Teacher Id cannot be empty' },
        isInt: { msg: 'Teacher Id must be a number' },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Class name cannot be null' },
        notEmpty: { msg: 'Class name cannot be empty' },
      }
    }
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};