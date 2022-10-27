const router = require('express').Router()
router.get('/abc',(req,res) => {
  console.log('111111')
  res.send('hello world');
})
module.exports =  router