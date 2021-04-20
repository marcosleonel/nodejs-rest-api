const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const Customers = require('../modules/customers/model.customers');

const deleteCustomer = {
  path: '/v1/customers/{id}',

  method: 'DELETE',

  handler: async (request, h) => {
    const { id } = request.params;
    let response;

    try {
      const customers = await Customers.destroy({
        where: {
          id,
        },
      });

      response = h.response(customers);
      response.type('application/json');
    } catch (error) {
      logger.error(`[deleteCustomer.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Remove cliente pelo ID',
    notes: 'Remove o cliente com o ID passado no parâmetro.',
    tags: ['api', 'customers', 'id'],
    validate: {
      params: Joi.object({
        id: Joi.string(),
      }),
    },
  },
};

module.exports = deleteCustomer;
