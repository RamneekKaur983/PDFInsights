'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("SELECT create_hypertable('views', 'time');");
  },

  down: (queryInterface, Sequelize) => {
  }
};