'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Orders', 'customerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'customerId');
  }
};
