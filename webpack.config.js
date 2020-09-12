const path = require('path');

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
  }
};