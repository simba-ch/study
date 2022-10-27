const sequelize = require('./db');
require('./Admin');
require('./Book');
require('./Class');
require('./Student');
require('./Class-Student')

sequelize.sync({
  alter:true
}).then(() => {
  require('../services/setData');
  console.log('所有模型同步完成')
})
