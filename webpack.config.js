module.exports = {
  entry: "./app/App.js",
  output: {
    path: "./public/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  },
  debug: true,
  devtool: 'source-map'
};
