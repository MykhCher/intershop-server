'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrder', {
      itemId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Items',
          key: 'id'
        },
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ItemOrder');
  }
};
