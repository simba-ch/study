module.exports = function (req,res,next) {
  console.log('请求了中间件1');
  next();
  // if(res._redisBody){
  //   console.log(res._redisBody)
  // }else{
  //   console.log(res)
  // }

  console.log(res)
  
}