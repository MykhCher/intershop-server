const categories = require('../../constants/categoriesData');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', categories);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', {});
    }
}