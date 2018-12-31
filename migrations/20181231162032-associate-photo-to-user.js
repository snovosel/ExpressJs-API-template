'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Photos',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
          'Photos', // name of the Target model
          'UserId' // key we want to remove
        );
  }
};
