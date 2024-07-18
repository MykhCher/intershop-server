const customersData = require("../../constants/customersData");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Customers', customersData);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Customers', {});
    }
}