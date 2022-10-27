const {createProxyMiddleware} = require('http-proxy-middleware')


module.exports = createProxyMiddleware({
  target:'https://img1.baidu.com/it/u=3182839745,3823732910&fm=26&fmt=auto',
  changeOrigin:true,
  pathRewrite:{
    '^/img':''
  }
})