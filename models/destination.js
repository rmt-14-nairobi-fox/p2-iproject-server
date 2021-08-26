'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.belongsTo(models.User, { foreignKey: 'authorId' })
      Destination.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Destination.belongsToMany(models.User, { through: 'Wishlist', foreignKey: 'DestinationId' })
    }
  };
  Destination.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        notNull: { msg: 'Name is required' }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Country is required' },
        notNull: { msg: 'Country is required' }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notEmpty: { msg: 'Price is required'},
        notNull: { msg: 'Price is required'}
      }
    },
    image: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};