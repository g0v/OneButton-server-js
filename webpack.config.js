var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var sourcePath = path.join(__dirname, 'src');
var targetPath = path.join(__dirname);

module.exports = {
  entry: ['babel-polyfill', path.join(sourcePath, 'index.js')],
  output: {
    path: targetPath,
    filename: 'bundle.js',
    publicPath: '/webroot/build/js'
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
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loaders: ['json']
    }]
  }
};
