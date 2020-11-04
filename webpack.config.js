const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'extension.js',
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
      },
    ],
  },
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: !!process.env.WEBPACK_DEV_SERVER,
    }),
  ],
}
