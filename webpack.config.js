var path = require('path');
var webpack = require('webpack');


var getDebug = function () {
    return (process.env.NODE_ENV === 'production');
};


var getSourcemap = function () {
    if (process.env.NODE_ENV === 'production') {
        return '#source-map';
    }

    return '#eval-source-map';
};


var getPlugins = function() {
    var plugins = [];

    if (process.env.NODE_ENV === 'production') {
        plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }));

        plugins.push(new webpack.optimize.UglifyJsPlugin())
    }

    return plugins;
};


module.exports = {
    entry: './app/index',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    devServer: {
        contentBase: './app',
        hot: true,
        historyApiFallback: true
    },


    debug: getDebug(),
    devtool: getSourcemap(),

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]'
            },
        ]
    },

    plugins: getPlugins()
};
