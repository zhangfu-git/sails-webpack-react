var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'eval-source-map',   //配置生成Source Maps
  entry: {
    main: './assets/react/main.js',
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
        loader  : 'babel'
      },
      {
        test : /\.json$/,
        loader: 'json'
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style!css?modules!postcss')     //postcss-loader 配合下面的autoprefixer自动添加前缀的插件
      }
    ]

  },
  postcss: [
    require('autoprefixer')   //调用autoprefixer插件
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new webpack.HotModuleReplacementPlugin(),  //添加了hotmodulereplacementplugin 让其运行不需要添加参数/
    new ExtractTextPlugin("[name]-[hash].css")
  ],
  devServer: {
    hot: true,
    inline: true,
    color: true
  }


}
