module.exports = (options,app) => {
  return async function (ctx,next){
    console.log('中间件开始');
    await next();
    console.log('中间件结束')
  }
}