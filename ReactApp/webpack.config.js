var path = require('path');


module.exports = {
   entry: './app/index', 
   output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js"
   },
   devServer: {
			contentBase: './app',
      hot: true
   },

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
}
