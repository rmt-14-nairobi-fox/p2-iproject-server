'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sign.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Sign.userId cannot be null'
        },
        notEmpty: {
          msg: 'Sign.userId cannot be empty'
        }        
      }
    },
    petitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Sign.petitionId cannot be null'
        },
        notEmpty: {
          msg: 'Sign.petitionId cannot be empty'
        }        
      }
    }
  }, {
    sequelize,
    modelName: 'Sign',
  });
  return Sign;
};