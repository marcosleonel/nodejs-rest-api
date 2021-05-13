const logger = require('./logger/logger');
const registerPlugins = require('./server/plugins');
const server = require('./server/server');
const db = require('./db/db');
const gracefulShutdown = require('./helpers/graceful-shutdown');

const init = async () => {
  await server.start();
  logger.info(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (unhandledRejectionError) => {
  logger.error(unhandledRejectionError.stack);
  gracefulShutdown(1, server, db, logger);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  gracefulShutdown(0, server, db, logger);
});

registerPlugins(server).then(() => init());
