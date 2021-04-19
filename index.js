const logger = require('./logger/logger');
const registerPlugins = require('./server/plugins');
const server = require('./server/server');

const init = async () => { // eslint-disable-line
  await server.start();
  logger.info(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (unhandledRejectionError) => {
  logger.error(unhandledRejectionError.stack);
  process.exit(1); // eslint-disable-line
});

registerPlugins(server).then(() => init());
