const logger = require('./logger/logger');
const registerPlugins = require('./server/plugins');
const server = require('./server/server');
const db = require('./db/db');

const init = async () => {
  await server.start();
  logger.info(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (unhandledRejectionError) => {
  logger.error(unhandledRejectionError.stack);
  // eslint-disable-next-line no-process-exit
  process.exit(1); // This rule was deprecated in ESLint v7.0.0
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received.');
  logger.info('Closing HTTP server...');

  server.close(() => {
    logger.info('HTTP server closed.');
    logger.info('Closing the database connection...');

    db.close();

    logger.info('Database connection closed.');
    // eslint-disable-next-line no-process-exit
    process.exit(0); // This rule was deprecated in ESLint v7.0.0
  });
});

registerPlugins(server).then(() => init());
