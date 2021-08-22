"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accommodation.belongsTo(models.User, { foreignKey: "AuthorId" });
      Accommodation.belongsToMany(models.User, {
        through: "SaveAccommodations",
      });
    }
  }
  Accommodation.init(
    {
      address: DataTypes.STRING,
      AuthorId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      zipCode: DataTypes.STRING,
      long: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Accommodation",
    }
  );
  return Accommodation;
};
