var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var sourcePath = path.join(__dirname, 'src');
var targetPath = path.join(__dirname);

module.exports = {
  entry: {
    client: ['babel-polyfill', path.join(sourcePath, 'client/index.jsx')]
  },
  output: {
    path: targetPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.json$/,
      loaders: ['json']
    }]
  },
  postcss: function() {
    return [autoprefixer, precss]
  }
};
