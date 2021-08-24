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
      StudentClass.belongsTo(models.Class, { foreignKey: 'ClassId' })
      StudentClass.belongsTo(models.Student, { foreignKey: 'StudentId' })
    }
  };
  StudentClass.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Class Id cannot be null' },
        notEmpty: { msg: 'Class Id cannot be empty' },
        isInt: { msg: 'Class id must be a number' }
      }
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Student Id cannot be null' },
        notEmpty: { msg: 'Student Id cannot be empty' },
        isInt: { msg: 'Student id must be a number' }
      }
    },
    score1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Score 1 cannot be null' },
        notEmpty: { msg: 'Score 1 cannot be empty' },
        isInt: { msg: 'Score 1 must be a number' },
        min: [0],
        max: [20]
      }
    },
    score2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Score 2 cannot be null' },
        notEmpty: { msg: 'Score 2 cannot be empty' },
        isInt: { msg: 'Score 2 must be a number' },
        min: [0],
        max: [20]
      }
    },
    score3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Score 3 cannot be null' },
        notEmpty: { msg: 'Score 3 cannot be empty' },
        isInt: { msg: 'Score 3 must be a number' },
        min: [0],
        max: [20]
      }
    },
    score4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Score 4 cannot be null' },
        notEmpty: { msg: 'Score 4 cannot be empty' },
        isInt: { msg: 'Score 4 must be a number' },
        min: [0],
        max: [20]
      }
    },
    score5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Score 5 cannot be null' },
        notEmpty: { msg: 'Score 5 cannot be empty' },
        isInt: { msg: 'Score 5 must be a number' },
        min: [0],
        max: [20]
      }
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Total Score cannot be null' },
        notEmpty: { msg: 'Total Score cannot be empty' },
        isInt: { msg: 'Total Score must be a number' },
        min: [0],
        max: [100]
      }
    },
    predikat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Predikat cannot be null' },
        notEmpty: { msg: 'Predikat cannot be empty' },
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Status cannot be null' },
        notEmpty: { msg: 'Status cannot be empty' },
      }
    },
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};