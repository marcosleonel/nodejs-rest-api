const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const CitiesQuery = require('../modules/cities/queries.cities');

const listCitiesByName = {
  path: '/v1/cities/name/{name}',

  method: 'GET',

  handler: async (request, h) => {
    const { name } = request.params;
    let response;

    try {
      const findByName = new CitiesQuery(name);
      const cities = await findByName.findByName();

      response = h.response(cities);
      response.type('application/json');
    } catch (error) {
      logger.error(`[listCitiesByName.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Obtém citade pelo nome',
    notes: 'Retorna a cidade com o nome passado no parâmetro ou um array vazio.',
    tags: ['api', 'cities', 'name'],
    validate: {
      params: Joi.object({
        name: Joi.string(),
      }),
    },
  },
};

module.exports = listCitiesByName;
