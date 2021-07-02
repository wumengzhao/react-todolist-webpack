// path模块是node.js中处理路径的核心模块。 可以很方便的处理关于文件路径的问题。
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
module.exports = merge(common, {
  mode: 'development',
  // 配置开发服务器
  devServer: {
      // 告诉服务器内容的来源
      contentBase: path.join(__dirname, 'dist'),
      // 为每个静态文件开启gzip压缩
      compress: true,
      // 打包好了自动打开浏览器
      open: true,
      // 开启热更新
      hot: true,
      port: 9000,
      // 设置代理
      proxy: {
        // 将本地 /api/xxx 代理到 localhost:7001/xxx
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          pathRewrite: {
            '/api': ''
          }
        }
      },
  },
  // 控制台提示信息映射
  devtool: 'inline-source-map',
});