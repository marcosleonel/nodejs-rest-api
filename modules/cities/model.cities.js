const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../db/db');

const model = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
};
const City = sequelize.define('City', model, {});
City.sync({ force: true });

module.exports = City;
