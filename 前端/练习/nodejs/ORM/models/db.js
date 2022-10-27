const Sequelize = require('sequelize');
module.exports = new Sequelize('myschooldb', 'root', '123123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})