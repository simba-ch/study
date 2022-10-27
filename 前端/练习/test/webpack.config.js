module.exports = {
  mode: 'development',
  module: {

    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      }
    ]
  }
};