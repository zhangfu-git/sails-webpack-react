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
        test  : /\.json$/,
        loader: 'json'
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style!css?modules!postcss')     //postcss-loader 配合下面的autoprefixer自动添加前缀的插件
      },
      {
        test : /\.(?: jpg|gir|png|svg)$/,
        loaders: [
          "url?limit=8000$name=img/[hash].[ext]",
          "image-webpack"
        ]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'url?limit=10000'
      }      
    ]

  },
  postcss: [
    require('autoprefixer')   //调用autoprefixer插件
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
    new ExtractTextPlugin("[name]-[hash].css"),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
  ]


}
