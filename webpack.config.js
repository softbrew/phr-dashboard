module.exports = {
  entry: "./app/App.js",
  output: {
    path: "./public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
