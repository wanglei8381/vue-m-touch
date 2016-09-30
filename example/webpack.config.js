var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'Vue',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.styl$/, loader: "style!css!stylus"},
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                },
                plugins: ['transform-runtime']
            },
            {test: /\.html$/, loader: "html"},
            {test: /\.vue$/, loader: 'vue'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.vue']
    },
    devtool: "source-map",
    contentBase: '/'
}
