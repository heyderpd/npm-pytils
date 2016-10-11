var webpack = require('webpack');

module.exports = {
  entry: './npm/index.js',
  output: {
    path: './npm',
    filename: 'pytils.bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

