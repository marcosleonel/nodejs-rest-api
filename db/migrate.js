const sequelize = require('./db');
const logger = require('../logger/logger');

/**
 * Executa as migrações do banco de dados utilizando o Sequelize.js.
 * @see https://sequelize.org/master/manual/model-basics.html#model-synchronization
 * @void
 */
async function migrate() {
  try {
    await sequelize.sync();
    logger.info('Todos os models foram sincronizados com sucesso.');
  } catch (error) {
    logger.error('Ocorreu um erro na migração do banco de dados', error);
  }
}

migrate();
