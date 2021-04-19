const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const routes = require('./routes');

/**
 * Register the routes, plugins and its options in a Hapi.js server.
 * @param {Hapi.server} server A configured server.
 * @see https://github.com/glennjones/hapi-swagger/blob/HEAD/optionsreference.md
 */
const registerPlugins = async (server) => { // eslint-disable-line
  await server.register([
    Vision,
    Inert,
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
