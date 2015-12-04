var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './app/App.js',
        login: './login/Login.js'
    },
    output: {
        path: './public/js',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    debug: true,
    devtool: 'source-map',
    plugins: []
};
