const Boom = require('@hapi/boom');
const logger = require('../logger/logger');

const createCity = {
  path: '/v1/cities',

  method: 'POST',

  handler() {
    let city;

    try {
      city = 'City created';
    } catch (error) {
      logger.error(`[createCity.handler] Error handling the request: ${error.stack}`);
      Boom.badRequest('Internal Error');
    }

    return city;
  },

  options: {
    description: 'Cadastra uma nova cidade.',
    notes: 'Envie as informações de nome da cidade e estado',
    tags: ['api', 'cities', 'create'],
  },
};

module.exports = createCity;
