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
    }
  };
  Form.init({
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'user cannot be empty'
        },
        notNull: {
          msg: 'user cannot be empty'
        }
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'number cannot be empty'
        },
        notNull: {
          msg: 'number cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'userId cannot be empty'
        },
        notNull: {
          msg: 'userId cannot be empty'
        }
      }
    },
    FarmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'farmId cannot be empty'
        },
        notNull: {
          msg: 'farmId cannot be empty'
        }
      }
    },
    farmName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'farmName cannot be empty'
        },
        notNull: {
          msg: 'farmName cannot be empty'
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