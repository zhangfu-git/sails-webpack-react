var webpack = require('webpack');

module.exports = {
  entry: {
    main: './assets/js/main.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: './dist',           //输出路径
    filename: '[name].js',      //输出名字
    publicPath: '/dist'
       // webpack-dev-server 启动目录是  `/`, `/dist` 目录是打包的目标目录相对于启动目录的路径
  },
  module: {

    loaders: [
      {
        test    : /\.js|\.jsx$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test : /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]

  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin()  /添加了hotmodulereplacementplugin 让其运行不需要添加参数/
  ],
  devServer: {
    hot: true,
    inline: true
  }


}
