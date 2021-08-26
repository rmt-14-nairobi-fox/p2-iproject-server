'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Post.belongsTo(models.SavedNews, {
        foreignKey: 'savedNews_id',
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
      });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title cannot be empty',
          },
          notEmpty: {
            msg: 'Title cannot be empty',
          },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Message cannot be empty',
          },
          notEmpty: {
            msg: 'Message cannot be empty',
          },
        },
      },
      user_id: DataTypes.INTEGER,
      savedNews_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
