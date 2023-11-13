const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_panier', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;