const gracefulShutdown = (exitCode, server, db, logger) => {
  logger.info('Closing HTTP server...');

  server.close(() => {
    logger.info('HTTP server closed.');
    logger.info('Closing the database connection...');

    db.close();

    logger.info('Database connection closed.');
    // eslint-disable-next-line no-process-exit
    process.exit(exitCode); // This rule was deprecated in ESLint v7.0.0
  });
};

module.exports = gracefulShutdown;
