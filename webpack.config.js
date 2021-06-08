const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname,'./docs'),
     filename: '[name].[contenthash].js',
  },
   optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sc|s)ss$/i,
        use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|svg|png|gif)$/,
        use:{
          loader: 'file-loader',
          options: {
          //  name: '[name].[ext]',
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            publicPath: 'images/'
          }
        }
        
      }
    ]
  },
  plugins: 
  [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html'
    }),
      new CopyPlugin({
      patterns: [
        { from: "src/images/", to: "images" },
        // { from: "other", to: "public" },
      ],
    }),
  ],
}