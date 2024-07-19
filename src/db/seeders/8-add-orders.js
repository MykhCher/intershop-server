const orders = require('../../constants/ordersData');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Orders', orders);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Orders', {});
    }
}