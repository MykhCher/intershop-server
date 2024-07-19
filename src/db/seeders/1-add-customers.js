const customersData = require("../../constants/customersData");
const { Customer } = require('../models');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await Customer.bulkCreate(customersData);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Customers', {});
    }
}