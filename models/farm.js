'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Farm.belongsTo(model.User)
      Farm.belongsTo(model.Type)
      Farm.hasMany(models.Form)
    }
  };
  Farm.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty'
        },
        notNull: {
          msg: 'name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description cannot be empty'
        },
        notNull: {
          msg: 'description cannot be empty'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'location cannot be empty'
        },
        notNull: {
          msg: 'location cannot be empty'
        }
      }
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'area cannot be empty'
        },
        notNull: {
          msg: 'area cannot be empty'
        }
      }
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'TypeId cannot be empty'
        },
        notNull: {
          msg: 'TypeId cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId cannot be empty'
        },
        notNull: {
          msg: 'UserId cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Farm',
  });
  return Farm;
};