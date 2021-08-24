"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helper/bycript");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review, { foreignKey: "UserId" });
      User.hasMany(models.Watchlist, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "email cannot be null" },
          notNull: { msg: "email cannot be null" },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email format" },
          notEmpty: { msg: "email cannot be null" },
          notNull: { msg: "email cannot be null" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "password cannot be null" },
          notNull: { msg: "password cannot be null" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(user) {
          user.password = hashPass(user.password);
        },
      },
    }
  );
  return User;
};
