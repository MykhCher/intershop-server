module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'db_name',
    host: '127.0.0.1',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json'
  },
  test: {},
  production: {}
}
