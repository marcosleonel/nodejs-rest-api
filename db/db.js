const { Sequelize } = require('sequelize');

/* This is just for experimental use. It's not a production best practice. */
const sequelize = new Sequelize('sqlite::memory:');

module.exports = sequelize;
