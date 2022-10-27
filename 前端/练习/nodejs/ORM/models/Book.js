const sequelize = require('./db');
const { DataTypes } = require('sequelize');
bookConfig = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
exports.book = sequelize.define('Book',
  bookConfig,
  {
    paranoid: true
  })

  exports.bookConfig = bookConfig;