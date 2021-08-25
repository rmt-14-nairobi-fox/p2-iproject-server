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
    }
  };
  Watcher.init({
    UserId: DataTypes.INTEGER,
    CoinId: DataTypes.INTEGER,
    minPrice: DataTypes.FLOAT,
    maxPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Watcher',
  });
  return Watcher;
};