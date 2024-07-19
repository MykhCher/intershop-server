const items = require('../../constants/itemsData');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Items', items);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Items', {});
    }
}