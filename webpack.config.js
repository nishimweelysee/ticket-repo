const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
require('dotenv/config.js');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  optimization:{
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
          vendor: {
            chunks: "initial",
            test: path.resolve(process.cwd(), "node_modules"),
            name: "vendor",
            enforce: true
          },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            dead_code: true,
            if_return: true,
            join_vars: true,
            warnings: false
          },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    clientLogLevel: 'silent',
    inline: true,
    open: true,
    port: process.env.PORT || 4000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public/index.html"), filename: 'index.html' }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new Dotenv(
        {
          path: './.env',
          safe: true,
          systemvars: true
        }
    )

  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]

      },
      {
        test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader'
      }
    ]
  },
  performance: {
    hints: false
  },
  
};
