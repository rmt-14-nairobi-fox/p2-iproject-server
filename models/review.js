"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Review.init(
    {
      url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "url cannot be null" },
          notNull: { msg: "url cannot be null" },
        },
      },
      image_url: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "image_url cannot be null" },
          notNull: { msg: "image_url cannot be null" },
        },
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "title cannot be null" },
          notNull: { msg: "title cannot be null" },
        },
      },
      episodes: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "episodes cannot be null" },
          notNull: { msg: "episodes cannot be null" },
        },
      },
      rated: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "rated cannot be null" },
          notNull: { msg: "rated cannot be null" },
        },
      },
      userpoin: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "userpoin cannot be null" },
          notNull: { msg: "userpoin cannot be null" },
        },
      },
      review: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "review cannot be null" },
          notNull: { msg: "review cannot be null" },
        },
      },
      recomendation: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "recomendation cannot be null" },
          notNull: { msg: "recomendation cannot be null" },
        },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: "UserId cannot be null" },
          notNull: { msg: "UserId cannot be null" },
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
