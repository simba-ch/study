
const sequelize = require('./db');
const { DataTypes } = require('sequelize');

studentConfig = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  mobile: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
}

exports.student = sequelize.define('Student',
  studentConfig,
  {
    paranoid: true
  }
);
exports.studentConfig = studentConfig;