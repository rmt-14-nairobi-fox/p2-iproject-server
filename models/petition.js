'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Petition.belongsTo(models.User, {foreignKey: 'authorId'})
    }
  };
  Petition.init({
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.authorId cannot be null'
        },
        notEmpty: {
          msg: 'Petition.authorId cannot be empty'
        }        
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.title cannot be null'
        },
        notEmpty: {
          msg: 'Petition.title cannot be empty'
        }        
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.imageUrl cannot be null'
        },
        notEmpty: {
          msg: 'Petition.imageUrl cannot be empty'
        },
        isUrl: {
          msg: 'Petition.imageUrl must be url Formatted'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.description cannot be null'
        },
        notEmpty: {
          msg: 'Petition.description cannot be empty'
        }        
      }
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.source cannot be null'
        },
        notEmpty: {
          msg: 'Petition.source cannot be empty'
        }        
      }
    },
    signCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.signCount cannot be null'
        },
        notEmpty: {
          msg: 'Petition.signCount cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.status cannot be null'
        },
        notEmpty: {
          msg: 'Petition.status cannot be empty'
        }        
      }
    },
    maxCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Petition.maxCount cannot be null'
        },
        notEmpty: {
          msg: 'Petition.maxCount cannot be empty'
        },
        min: {
          args: 2,
          msg: 'Minimum value for Petition.maxCount are 2'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Petition',
  });
  return Petition;
};