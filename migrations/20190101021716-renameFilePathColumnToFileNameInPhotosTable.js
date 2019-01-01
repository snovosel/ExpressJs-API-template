'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Photos',
      'file_path',
      'file_name',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Photos',
      'file_name',
      'file_path',
    );
  }
};
