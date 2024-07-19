const types = require('../../constants/typesData');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Types', types);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Types', {});
    }
}