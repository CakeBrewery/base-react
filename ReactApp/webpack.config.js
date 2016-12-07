var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");


var getDebug = function () {
    return (process.env.NODE_ENV === 'production');
};


var getSourcemap = function () {
    if (process.env.NODE_ENV === 'production') {
        return '#cheap-source-map';
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
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin());
        plugins.push(new webpack.optimize.AggressiveMergingPlugin());

        /*
        plugins.push(new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }));
        */
    }

    return plugins;
};


module.exports = {
    entry: {
        app: './app/index',
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
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
