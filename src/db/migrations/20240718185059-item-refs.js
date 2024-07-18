'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Items', 'brandId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Brands',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Items', 'modelId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Models',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Items', 'categoryId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Items', 'typeId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Types',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Items', 'storeId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'Stores',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'brandId');
    await queryInterface.removeColumn('Items', 'modelId');
    await queryInterface.removeColumn('Items', 'categoryId');
    await queryInterface.removeColumn('Items', 'typeId');
    await queryInterface.removeColumn('Items', 'storeId');
  }
};
