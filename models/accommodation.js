"use strict";
const { Model } = require("sequelize");
const { geocode } = require("../helpers/geocode");

module.exports = (sequelize, DataTypes) => {
  class Accommodation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accommodation.hasMany(models.Image, { foreignKey: "AccommodationId" });
      Accommodation.belongsTo(models.User, { foreignKey: "AuthorId" });
      Accommodation.belongsToMany(models.User, {
        through: "SaveAccommodations",
      });
      Accommodation.belongsToMany(models.Facility, {
        through: "AccommodationFacilities",
      });
      Accommodation.belongsToMany(models.User, {
        through: "Visits",
      });
    }
  }
  Accommodation.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title is required",
          },
          notEmpty: {
            msg: "Title is required",
          },
        },
      },
      // ! address is street
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address is required",
          },
          notEmpty: {
            msg: "Address is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "City is required",
          },
          notEmpty: {
            msg: "City is required",
          },
        },
      },
      AuthorId: DataTypes.INTEGER,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      status: DataTypes.STRING,
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Zip code is required",
          },
          notEmpty: {
            msg: "Zip code is required",
          },
        },
      },
      long: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Type is required",
          },
          notEmpty: {
            msg: "Type is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Accommodation",
    }
  );

  Accommodation.beforeCreate(async (data, opt) => {
    try {
      const getGeoCode = await geocode(
        data.address + " " + data.city + " " + data.zipCode
      );
      data.long = getGeoCode.longitude;
      data.lat = getGeoCode.latitude;
    } catch (err) {
      throw new Error();
    }
  });
  return Accommodation;
};
