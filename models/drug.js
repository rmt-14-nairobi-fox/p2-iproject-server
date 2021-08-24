'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Drug.belongsTo(models.Category,{foreignKey: 'categoryId'})
      Drug.belongsToMany(models.User,{as:"Favorites",through:models.Favorite})
    }
  };
  Drug.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      notNull:{
        msg:"name cannot be null"
      },
      notEmpty:{
        msg:"name cannot be Empty"
      },
    },
    rangePrice: DataTypes.STRING,
    description: DataTypes.STRING,
    composition: DataTypes.STRING,
    doses: DataTypes.STRING,
    rule: DataTypes.STRING,
    categoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references : {
        model : 'Categories',
        key : 'id'
      },
      onUpdate : 'cascade',
      onDelete : 'cascade'
    },
    imgUrl: {
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Drug',
  });
  return Drug;
};