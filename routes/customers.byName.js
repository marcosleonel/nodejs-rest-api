const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const Customers = require('../modules/customers/model.customers');

const listCustomerByName = {
  path: '/v1/customers/fullName/{fullName}',

  method: 'GET',

  handler: async (request, h) => {
    const { fullName } = request.params;
    let response;

    try {
      const customers = await Customers.findAll({
        where: {
          fullName,
        },
      });

      response = h.response(customers);
      response.type('application/json');
    } catch (error) {
      logger.error(`[listCustomerByName.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Obtém cliente pelo nome',
    notes: 'Retorna o cliente com o nome passado no parâmetro ou um array vazio.',
    tags: ['api', 'customers', 'fullName'],
    validate: {
      params: Joi.object({
        fullName: Joi.string(),
      }),
    },
  },
};

module.exports = listCustomerByName;
