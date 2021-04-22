const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const CustomersQuery = require('../modules/customers/queries.customers');

const createCustomer = {
  path: '/v1/customers',

  method: 'PUT',

  handler: async (request, h) => {
    let response;

    try {
      const {
        id,
        fullName,
        gender,
        birthdate,
        age,
        city,
      } = request.query;
      const customer = new CustomersQuery(fullName, gender, birthdate, age, city);
      customer.setId(id);
      await customer.update();

      response = h.response({ msg: 'customer updated' });
      response.type('application/json');
      response.code(202);
    } catch (error) {
      logger.error(`[createCustomer.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Cadastra um novo cliente.',
    notes: 'Envie as informações de nome completo, sexo, data de nascimento, idade e cidade onde mora.', // eslint-disable-line
    tags: ['api', 'customers', 'create'],
    validate: {
      query: Joi.object({
        id: Joi.string(),
        fullName: Joi.string(),
        gender: Joi.string(),
        birthdate: Joi.date(),
        age: Joi.number().integer(),
        city: Joi.string(),
      }),
    },
  },
};

module.exports = createCustomer;
