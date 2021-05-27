'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE , 
        primaryKey: true
      },
      sharer_id: {
        type: Sequelize.INTEGER
      },
      sharee_id: {
        type: Sequelize.INTEGER
      },
      document_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('shares');
  }
};