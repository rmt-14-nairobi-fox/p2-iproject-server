'use strict';
const {
  Model
} = require('sequelize');

const {generatePass} = require('./../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Story, {through : models.StoryComment})
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Name cannot empty"
        },
        notNull : {
          msg : "Name cannot empty"
        },
        }
    },
    email: {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "email cannot empty"
        },
        notNull : {
          msg : "email cannot empty"
        },
        isEmail : {
          msg : "Email is invalid"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password cannot empty"
        },
        notNull : {
          msg : "Password cannot empty"
        }
      }
    },
    date_birth: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Date birh cannot empty"
        },
        notNull : {
          msg : "Date birh cannot empty"
        }
      }
    },
    profile_picture: {
      type : DataTypes.STRING,
    },
    gender : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Profile picture cannot empty"
        },
        notNull : {
          msg : "Profile picture cannot empty"
        }        
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user) => {
        user.profile_picture = "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619"
        user.password = generatePass(user.password)
      }
    }
  });
  return User;
};