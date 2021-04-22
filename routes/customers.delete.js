const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const CustomersQuery = require('../modules/customers/queries.customers');

const deleteCustomer = {
  path: '/v1/customers/{id}',

  method: 'DELETE',

  handler: async (request, h) => {
    const { id } = request.params;
    let response;

    try {
      const customer = new CustomersQuery();
      customer.setId(id);
      await customer.delete();

      response = h.response({ msg: 'customer deleted' });
      response.type('application/json');
      response.code(202);
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
