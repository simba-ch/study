module.exports = function (req,res,next) {
  console.log('请求了中间件2')
  // res._redisBody = 'abc'
  // console.log('中间件2向res中注入了redisBody')
  res.send('hello world');
  // res.end('hello world')
  next()
}