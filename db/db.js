const { Sequelize } = require('sequelize');

// TODO: Mudar o banco para Postgres.
const sequelize = new Sequelize('sqlite::memory:');

module.exports = sequelize;
