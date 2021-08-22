"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SaveAccommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaveAccommodation.belongsTo(models.User);
      SaveAccommodation.belongsTo(models.Accommodation);
    }
  }
  SaveAccommodation.init(
    {
      UserId: DataTypes.INTEGER,
      AccommodationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SaveAccommodation",
    }
  );
  return SaveAccommodation;
};
