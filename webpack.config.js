const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"););

module.exports = {
    mode: 'development',
    entry: {
        main: './webpack.js',
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: '[name].[contenthash].bundle.js',

    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "build"),
        hot: true
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "index.html"),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' })
    ],
    module: {
        rules: [
            {
                // the target html file is defined inside the HtmlWebpackPlugin
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                // !this will create a css file and inject a link tag on html on head tag
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                }, {
                    loader: "css-loader"
                }]
            },
            {
                // !this will create a css file and inject a link tag on html on head tag
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                // FONTS: https://chriscourses.com/blog/loading-fonts-webpack
                // !local/downloaded fonts will be copied to the outputPath
                // !once it imported via @import or src() inside a css/scss
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },
            {
                // local/downloaded images will be copied to the outputPath
                // !once it imported via src() inside a css/scss
                // !for html's img src import it from the entry point files
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },
            {
                // local/downloaded videos will be copied to the outputPath
                // !once it imported via src() inside a css/scss
                // !for html's video import it from the entry point files
                // !same idea with the images
                test: /\.(mp4|ogg|webm)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/videos/'
                        }
                    }
                ]
            },
        ]
    }
};