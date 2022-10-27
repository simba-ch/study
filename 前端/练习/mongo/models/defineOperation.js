const mongoose = require('mongoose');
const address = require('./defineAddress');

const operationSchema = mongoose.Schema({
  operation:{
    type:String,
    enmu:['登陆','注销','阅读文章','发布文章','发布评论'],
    required:true
  },
  time:{
    type:Date,
    default:Date.now,
    required:true,
  },
  userid:{
    type:mongoose.Types.ObjectId,
    required:true,
  },
  extraInfo:Object,
  address
})

const Operation = mongoose.model('operation',operationSchema)