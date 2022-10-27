const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test1')

const db = mongoose.connection;
db.on('error', console.log.bind('connection error:'));
db.once('open', async () => {
  console.log('connect success')
  require('./defineUsers');
  require('./defineOperation')
})