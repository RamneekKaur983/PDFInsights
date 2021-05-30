'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.addColumn('comments', 'commentor_id', Sequelize.INTEGER);
    
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
