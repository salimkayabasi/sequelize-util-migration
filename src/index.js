const Umzug = require('umzug');
const Sequelize = require('sequelize');

module.exports = async (sequelize, { path, pattern = /\.js$/, logging }) => {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
    migrations: {
      params: [sequelize.getQueryInterface(), Sequelize],
      path,
      pattern,
    },
    logging,
  });
  if (logging) {
    ['migrating', 'migrated', 'reverting', 'reverted'].forEach((eventName) => {
      umzug.on(eventName, (...params) => logging(eventName, ...params));
    });
  }
  return umzug;
};
