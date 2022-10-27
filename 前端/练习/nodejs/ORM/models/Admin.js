const sequelize = require('./db')
const { DataTypes } = require('sequelize');
adminConfig = {
  loginId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: 'normal', //值为normal或sudo
    allowNull: true
  }
}
exports.admin = sequelize.define('Admin', adminConfig, {
  paranoid: true
});

exports.adminConfig = adminConfig