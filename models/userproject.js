'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProject.belongsTo(models.User, {through: models.Project});
      UserProject.belongsTo(models.Project, {through: models.User});
    }
  };
  UserProject.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "no apply" 
    }
  }, {
    sequelize,
    modelName: 'UserProject',
  });
  return UserProject;
};