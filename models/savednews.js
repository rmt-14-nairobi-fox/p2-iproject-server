'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavedNews.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  SavedNews.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
      url: DataTypes.STRING,
      image: DataTypes.STRING,
      publishedAt: DataTypes.DATE,
      source_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      source_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'SavedNews',
    }
  );
  return SavedNews;
};
