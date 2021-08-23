'use strict';
const {hashPassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Drug,{as:"Favorites",through:models.Favorite})
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      isEmail:true,
      unique:{
        args:true,
        msg:"Email is already exists"
      },
      validate:{
        notNull:{
          msg:"Email cannot be null"
        },
        notEmpty:{
          msg:"Email cannot be Empty"
        },
        isEmail:{
          msg:"Invalid email format"
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      notNull:{
        msg:"password cannot be null"
      },
      notEmpty:{
        msg:"password cannot be Empty"
      },
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      notNull:{
        msg:"username cannot be null"
      },
      notEmpty:{
        msg:"username cannot be Empty"
      },
    },
    phoneNumber: {
      type:DataTypes.STRING,
      allowNull:false,
      notNull:{
        msg:"phoneNumber cannot be null"
      },
      notEmpty:{
        msg:"phoneNumber cannot be Empty"
      },
    }
  }, {
    hooks:{
      beforeCreate:(user,options)=>{
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};