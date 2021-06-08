const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname,'./docs'),
    filename: 'myBundle.js',
  },
  devServer: {
    before: function(src, server){
      server._watch('./src/*.html')
    },
    contentBase: path.join(__dirname,'src'),
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(sc|s)ss$/i,
        use: ["style-loader","css-loader","sass-loader"],
      },
      {
        test: /\.(jpg|svg|png)$/i,
        type: 'asset/resource',
      }
    ]
  }
}