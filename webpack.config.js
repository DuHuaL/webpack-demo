const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理dist
const { CleanWebpackPlugin }= require('clean-webpack-plugin');
// 启动HMR
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  // 打包模式
  mode: 'development',
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  // 配置loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        // 执行从下往上
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: ['file-loader']
      },
      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      // es6转es5
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
            {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  // 配置省略后缀名
  resolve: {
    // 省略后缀名的配置
    extensions: ['.js','.json','.css','.vue'],
    // 配置@ 为src根目录
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 插件
  plugins: [
    new VueLoaderPlugin(),
    // 打包的时候清空dist文件
    new CleanWebpackPlugin({
      dry: true
    }),
    // 这个插件是基于index.html模板去生成最终要发布的首页
    new HtmlWebpackPlugin({
      // 生成首页的title
      title: 'Output Management',
      // 定义生成的文件名称
      filename: 'index.html',
      // 基于index.html模板生成
      template: 'index.html',
      // 开启压缩文件
      minify: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 映射错误信息到原文件中
  // devtool: 'inline-source-map' 这种写法把生成的source-map也打包到bundle.js中了
  devtool: 'source-map',
  // 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)
  devServer: {
    contentBase: './dist',
    hot: true
  }
};