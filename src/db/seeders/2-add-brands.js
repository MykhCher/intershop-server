const brands = require("../../constants/brandsData");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Brands', brands, {});
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Brands', {});
    }
}