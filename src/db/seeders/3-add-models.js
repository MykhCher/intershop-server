const models = require("../../constants/modelsData");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Models', models);
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Models', {});
    }
}