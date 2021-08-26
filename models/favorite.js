'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User)
    }
  };
  Favorite.init({
    id:{
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    nameDrug:  DataTypes.STRING,
    sellingUnitDrug: DataTypes.STRING,
    minPriceDrug: DataTypes.INTEGER,
    BasePriceDrug: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};