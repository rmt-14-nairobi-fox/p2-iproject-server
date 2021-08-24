'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StudentClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClassId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      StudentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      score1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score3: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score4: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      score5: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      totalScore: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      predikat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StudentClasses');
  }
};