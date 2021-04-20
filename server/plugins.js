const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const routes = require('./routes');

/**
 * Registra as rotas, plugins e opções em server Hapi.js server.
 * @param {Hapi.server} server Um server configurado.
 * @see https://github.com/glennjones/hapi-swagger/blob/HEAD/optionsreference.md
 */
const registerPlugins = async (server) => { // eslint-disable-line
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Node.js Hapi API',
          version: 'v1.0',
        },
        schemes: ['http'],
        host: 'localhost:3000',
        auth: false,
        cors: true,
      },
    },
  ]);

  server.route([...routes]);
};

module.exports = registerPlugins;
