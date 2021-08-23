"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visit.belongsTo(models.User);
      Visit.belongsTo(models.Accommodation);
    }
  }
  Visit.init(
    {
      AccommodationId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      visitDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "It should be date format",
          },
          notNull: {
            msg: "Date is required",
          },
          notEmpty: {
            msg: "Date is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Visit",
    }
  );
  return Visit;
};
