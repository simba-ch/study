const sequelize = require('./db');
const { DataTypes } = require('sequelize');

classConfig = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openData: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
};
exports.class = sequelize.define('Class', classConfig,
  {
    paranoid: false
  })

exports.classConfig = classConfig;
exports.classConfig = classConfig
