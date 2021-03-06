var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var sourcePath = path.join(__dirname, '../src');
var targetPath = path.join(__dirname, '../');

module.exports = {
  entry: {
    server: path.join(sourcePath, 'server.js')
  },
  output: {
    path: targetPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
};
