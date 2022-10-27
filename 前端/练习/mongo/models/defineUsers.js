const mongoose = require('mongoose');
const address = require('./defineAddress')
const usersSchema = mongoose.Schema({
  loginId: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 18
  },
  loginPwd: {
    type: String,
    required: true,
    select: false,
    trim:true,
    minlength:6,
    maxlength:18
  },
  name: {
    type: String,
    required: true,
    trim:true,
    minlength: 2,
    maxlength: 10
  },
  loves: {
    type: [String],

  },
  address
})

const User = mongoose.model('Users',usersSchema);

