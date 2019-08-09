const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const isProduct = process.env.NODE_ENV ==='production'
module.exports = {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          cacheGroups: {
              vendor: {
                test: /node_modules/, // 用于规定缓存组匹配的文件位置
                name: 'vendor',
                minSize: 30000,
                priority: -10,//优先级
              },
              react: {
                name: 'react',
                test: module => /react|redux/.test(module.context),
                chunks: 'initial',
                priority: 11,
                enforce: true,
            }
          }
        }
    },
    entry: {
      index:path.join(__dirname, './src/index.js'),
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "js/[name]-[hash]" + ".js",
        chunkFilename: "js/[name]-[hash]" + ".js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude:/node_modules/,
          use: [{
              loader: 'babel-loader',
              options: { presets: [ 'es2015', 'react',"stage-0"] }       
          }],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader', 
            { loader: 'less-loader', options: { javascriptEnabled: true } },
            { loader: 'style-resources-loader',options: {patterns: [path.resolve(__dirname, './src/static/css/index.less')] }}
          ]
        },
        {
          test:/\.(jpg|png|gif|jpeg)$/,
          use:[{
              loader:'url-loader',
              options:{
                  name: '[name]_[hash].[ext]',
                  outputPath: 'static/images/',
                  limit:20000
              }
          }]
        },
        {
            test:/\.(ttf|eot|woff|woff2|svg)$/,
            use:[{
              loader:'file-loader',
              options:{
                  name: '[name]_[hash].[ext]',
                  outputPath: 'static/css/'
              }
          }]
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.less', '.scss', '.css'],
      alias: {
        '@':  path.resolve(__dirname, './src')
      }
    },
    plugins:[
      new HtmlWebPackPlugin({
        template: './index.html',
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        filename: 'index.html'
       }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:8].css",
     　 chunkFilename: "./static/css/[id]_[chunkhash:8].css"
      }),
      new CleanWebpackPlugin(),
      new optimizeCss()
    ],
    devServer: {
      // contentBase: path.join(__dirname, 'dist'), //开发服务运行时的文件根目录
      hot: true,
      compress: true, //开发服务器是否启动gzip等压缩
      historyApiFallback: true, //不会出现404页面，避免找不到
      proxy: {
          '/api': {
              target: 'http://localhost:8888',
              pathRewrite: {'^/api': ''},
              changeOrigin: true,
              secure: false
          }
      }
  },
}