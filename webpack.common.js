// path模块是node.js中处理路径的核心模块。 可以很方便的处理关于文件路径的问题。
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  //指定入口文件，默认是./src/index.js
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), // 输出的路径
    filename: 'bundle.js' // 打包后文件
  },
  module: {
    rules: [{
        //遇到后缀为.css的文件, webpack先用css-loader加载器去解析这个文件
        //最后计算完的css ,将会使用style-loader生成一个内容为最终解析完的css代码的style标签
        // webpack在打包过程中,遇到后缀为css的文件,就会使用style-loader和css-loader去加载
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        //对于比较小的图片,使用base64编码，
        //可以减少-次图片的网络请求;那么对于比较大的图片,使用base64就不适合了,
        //编码会和htm1混在一起，一 方面可读性差 ,另一方面加大了html页面的大小，
        //反而加大了下载页面的大小,得不偿失,因此设置一个合理的limit是非常有必要的。
        test: /\.(png|jpg|pdf|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 小于100kb的图片会被base64
              limit: 1024 * 100,
              name: '[hash:8]-[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        // 加载规则是从右到左
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        //处理es6,es7,es8
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],  
      },
    ],
  },
  plugins: [
    //插件
    new HtmlWebpackPlugin({
      title: 'todo-list',
      // 从给出的模版自动生成新的html
      template: './public/index.html',
      filename: 'index.html'
    }),
    // 打包前清理打包目录（dist）
    new CleanWebpackPlugin(),
  ],
};