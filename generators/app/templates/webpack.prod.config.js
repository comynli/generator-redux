var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(css|less)$/,
        exclude: /\.(useable|post)\.(css|less)/,
        loader: 'style!css!less'
      },
      {
        test: /\.post\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.useable\.(css|less)$/,
        loader: "style/useable!css!less"
      },
      {
        test: /\.(woff|png|jpg|gif|svg)/,
        loader: 'file!url'
      }
    ]
  },
  postcss: [ require('autoprefixer')]
};
