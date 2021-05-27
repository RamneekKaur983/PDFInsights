'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('View2s', {
      id: {
        allowNull: false,
        autoIncrement: true,
        
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE ,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      document_id: {
        type: Sequelize.INTEGER
      },
      view_type: {
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
    await queryInterface.dropTable('View2s');
  }
};

