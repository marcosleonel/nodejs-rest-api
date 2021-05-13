const CityModel = require('../modules/cities/model.cities');
const CustomerModel = require('../modules/customers/model.customers');

const resolvers = {
  AllowedGenders: {
    MALE: 'Male',
    FEMALE: 'Female',
    NON_BINARY: 'Non Binary',
  },
  cities: async () => {
    const cities = await CityModel.findAll();
    return cities;
  },
  customers: async () => {
    const customers = await CustomerModel.findAll();
    return customers;
  },
};

module.exports = resolvers;
