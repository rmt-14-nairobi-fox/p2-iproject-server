'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Story.belongsTo(models.User, {foreignKey : 'AuthorId'})
      Story.hasMany(models.StoryComment, {foreignKey : 'StoryId'})
      Story.hasMany(models.StoriesLike, {foreignKey : 'StoryId'})
    }
  };
  Story.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Title is cannot empty"
        },
        notNull : {
          msg : "Title is cannot empty"
        }
      }
    },
    sinopsis: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Sinopsis is cannot empty"
        },
        notNull : {
          msg : "Sinopsis is cannot empty"
        }
      }
    },
    story_text: {
      type : DataTypes.TEXT,
      allowNull : false,
    },
    cover_image_url: {
      type : DataTypes.STRING,
      allowNull : false
    },
    AuthorId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    tag: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Story tag is required",
        },
        notNull : {
          msg : "Story tag is required",
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};