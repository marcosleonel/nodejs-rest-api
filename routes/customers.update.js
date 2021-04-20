const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const Customers = require('../modules/customers/model.customers');

const createCustomer = {
  path: '/v1/customers',

  method: 'PUT',

  handler: async (request, h) => {
    let response;

    try {
      await Customers.update(request.query, {
        where: {
          id: request.query.id,
        },
      });

      response = h.response({ msg: 'success' });
      response.type('application/json');
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
