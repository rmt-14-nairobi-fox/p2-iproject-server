"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccommodationFacility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccommodationFacility.belongsTo(models.Facility);
      AccommodationFacility.belongsTo(models.Accommodation);
    }
  }
  AccommodationFacility.init(
    {
      AccommodationId: DataTypes.INTEGER,
      FacilityId: DataTypes.INTEGER,
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Amount is required",
          },
          notEmpty: {
            msg: "Amount is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "AccommodationFacility",
    }
  );
  return AccommodationFacility;
};
