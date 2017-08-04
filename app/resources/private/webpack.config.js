const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader','postcss-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader', 
    use: ['css-loader','postcss-loader', 'sass-loader']
})
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: './assets/scripts/app.js',
    output: {
        path: __dirname + '/../public',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + '/../public',
        compress: true,
        stats: 'errors-only',
        hot: true,
        open: true,
        openPage: '',
        proxy: {
            '/api': 'http://localhost:3000/api',
            '/share': 'http://localhost:3000/share'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Notes app',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
            template: './assets/index.ejs'
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true,
            disable: !isProd
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}