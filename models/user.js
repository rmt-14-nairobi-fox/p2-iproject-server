"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name is required",
          },
          notEmpty: {
            msg: "name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email is already exists",
        },
        validate: {
          isEmail: {
            msg: "must be email format",
          },
          notNull: {
            msg: "email is required",
          },
          notEmpty: {
            msg: "email is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phone number is required",
          },
          notEmpty: {
            msg: "phone number is required",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "username is already exists",
        },
        validate: {
          notNull: {
            msg: "username is required",
          },
          notEmpty: {
            msg: "username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is required",
          },
          notEmpty: {
            msg: "password is required",
          },
          len: {
            args: [5, 50],
            msg: "password min with 5 characters and max 50 characters",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address is required",
          },
          notEmpty: {
            msg: "address is required",
          },
        },
      },
      imgUser: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
          if (!user.imgUser) {
            user.imgUser = `https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png`;
          }
        },
      },
    }
  );
  return User;
};
