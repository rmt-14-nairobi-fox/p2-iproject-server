"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail, { foreignKey: "OrderId" });
      Order.belongsTo(models.User, { foreignKey: "CustomerId" });
    }
  }
  Order.init(
    {
      CustomerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isPayment: {
        type: DataTypes.STRING,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
      tokenPayment: {
        type: DataTypes.STRING,
      },
      codeTransaction: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
