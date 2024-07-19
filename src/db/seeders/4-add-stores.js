const stores = require('../../constants/storesData');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Stores', stores);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Stores', {});
    }
}