const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const Customers = require('../modules/customers/model.customers');

const listCustomerById = {
  path: '/v1/customers/id/{id}',

  method: 'GET',

  handler: async (request, h) => {
    const { id } = request.params;
    let response;

    try {
      const customers = await Customers.findAll({
        where: {
          id,
        },
      });

      response = h.response(customers);
      response.type('application/json');
    } catch (error) {
      logger.error(`[listCustomerById.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Obtém cliente pelo ID',
    notes: 'Retorna o cliente com o ID passado no parâmetro ou um array vazio.',
    tags: ['api', 'customers', 'id'],
    validate: {
      params: Joi.object({
        id: Joi.string(),
      }),
    },
  },
};

module.exports = listCustomerById;
