const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const CitiesQuery = require('../modules/cities/queries.cities');

const createCity = {
  path: '/v1/cities',

  method: 'POST',

  handler: async (request, h) => {
    const { name, state } = request.query;
    let response;

    try {
      const city = new CitiesQuery(name, state);
      await city.create();

      response = h.response({ msg: 'success' });
      response.type('application/json');
      response.code(201);
    } catch (error) {
      logger.error(`[createCity.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Cadastra uma nova cidade.',
    notes: 'Envie as informações de nome da cidade e estado',
    tags: ['api', 'cities', 'create'],
    validate: {
      query: Joi.object({
        name: Joi.string(),
        state: Joi.string(),
      }),
    },
  },
};

module.exports = createCity;
