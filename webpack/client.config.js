var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var sourcePath = path.join(__dirname, '../src/client/');
var targetPath = path.join(__dirname, '../');

module.exports = {
  entry: {
    client: ['babel-polyfill', path.join(sourcePath, 'index.jsx')]
  },
  output: {
    path: targetPath,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: { context: sourcePath }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: { '~': sourcePath }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
      exclude: sourcePath
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            parser: 'postcss-scss',
            plugins: function () { return [precss, autoprefixer] }
          }
        }
      ],
      include: sourcePath
    }]
  }
};
