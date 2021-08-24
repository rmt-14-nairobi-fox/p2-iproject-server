'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Form.belongsTo(models.User)
      Form.belongsTo(models.Farm)
    }
  };
  Form.init({
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
    },
    FarmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'FarmId cannot be empty'
        },
        notNull: {
          msg: 'FarmId cannot be empty'
        }
      }
    },
    request: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'request cannot be empty'
        },
        notNull: {
          msg: 'request cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'status cannot be empty'
        },
        notNull: {
          msg: 'status cannot be empty'
        }
      }
    },
    admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};