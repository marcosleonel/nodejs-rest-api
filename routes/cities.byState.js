const Boom = require('@hapi/boom');
const Joi = require('joi');
const logger = require('../logger/logger');
const City = require('../modules/cities/model.cities');

const listCitiesByState = {
  path: '/v1/cities/state/{state}',

  method: 'GET',

  handler: async (request, h) => {
    const { state } = request.params;
    let response;

    try {
      const cities = await City.findAll({
        where: {
          state,
        },
      });

      response = h.response(cities);
      response.type('application/json');
    } catch (error) {
      logger.error(`[listCitiesByState.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return response;
  },

  options: {
    description: 'Obtém citade pelo estado.',
    notes: 'Retorna lista de cidades com o estado passado no parâmetro ou um array vazio.',
    tags: ['api', 'cities', 'state'],
    validate: {
      params: Joi.object({
        state: Joi.string(),
      }),
    },
  },
};

module.exports = listCitiesByState;
