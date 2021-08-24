'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StudentClass.init({
    ClassId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score1: DataTypes.INTEGER,
    score2: DataTypes.INTEGER,
    score3: DataTypes.INTEGER,
    score4: DataTypes.INTEGER,
    score5: DataTypes.INTEGER,
    totalScore: DataTypes.INTEGER,
    predikat: DataTypes.STRING,
    status: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};