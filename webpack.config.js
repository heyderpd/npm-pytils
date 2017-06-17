var webpack = require('webpack');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'pytils.bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

