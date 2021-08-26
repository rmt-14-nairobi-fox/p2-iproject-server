'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coin.hasMany(models.Watcher)
      Coin.belongsToMany(models.User, {through: models.Watcher})
    }
  };
  Coin.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: `coin name already exists`
      }
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Coin symbol already used'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    recommendation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    analysis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    priceHistory: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Coin',
  });
  return Coin;
};