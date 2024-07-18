'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Models', 'brandId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Brands',
        key: 'id'
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Models', 'brandId');
  }
};
