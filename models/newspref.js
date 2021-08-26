'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsPref extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsPref.hasMany(models.User, {
        foreignKey: 'newsPrefId',
      });
    }
  }
  NewsPref.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name cannot be empty',
          },
          notEmpty: {
            msg: 'Name cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'NewsPref',
    }
  );
  return NewsPref;
};
