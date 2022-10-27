const url = require('url');


module.exports = (req,res,next) => {
  // console.log(111111)
  // console.log('headers: ',req.headers.referer)
  // console.log('header: ',req.header('referer'))
  next()
}