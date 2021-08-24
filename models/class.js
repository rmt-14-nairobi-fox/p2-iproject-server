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
    }
  };
  Class.init({
    TeacherId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};