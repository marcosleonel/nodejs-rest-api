const citiesCreate = require('../routes/cities.create');
const citiesByName = require('../routes/cities.byName');
const citiesByState = require('../routes/cities.byState');
const customersCreate = require('../routes/customers.create');
const customersDelete = require('../routes/customers.delete');
const customersById = require('../routes/customers.byId');
const customersByName = require('../routes/customers.byName');

const routes = [
  citiesCreate,
  citiesByName,
  citiesByState,
  customersCreate,
  customersDelete,
  customersById,
  customersByName,
];

module.exports = routes;
