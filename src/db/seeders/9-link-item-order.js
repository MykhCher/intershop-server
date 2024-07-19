const itemOrder = require('../../constants/itemOrder');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('ItemOrder', itemOrder);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ItemOrder', {});
    }
}