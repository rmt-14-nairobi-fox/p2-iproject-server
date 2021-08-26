'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watcher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Watcher.belongsTo(models.User)
      Watcher.belongsTo(models.Coin)

    }
  };
  Watcher.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'UserId cannot be null'
        },
        notEmpty: {
          msg: 'UserId cannot be empty'
        }
      },
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    CoinId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'CoinId cannot be null'
        },
        notEmpty: {
          msg: 'CoinId cannot be empty'
        }
      },
      references: {
        model: 'Coins',
        key: 'id'
      }
    },
    minPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'minPrice cannot be null'
        },
        notEmpty: {
          msg: 'minPrice cannot be empty'
        }
      }
    },
    maxPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'maxPrice cannot be null'
        },
        notEmpty: {
          msg: 'maxPrice cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Watcher',
  });
  return Watcher;
};