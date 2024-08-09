require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST_NAME,
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
    logging: false
  },
  test: {},
  production: {}
}
