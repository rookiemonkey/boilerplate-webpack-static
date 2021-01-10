const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {

    entry: {
        main: path.resolve(__dirname, "./webpack.js"),
    },


    output: {
        path: path.resolve(__dirname, "./build"),
        filename: '[name].[contenthash].bundle.js',
        publicPath: '',
    },


    devServer: {
        contentBase: path.resolve(__dirname, "./build"),
        port: 8080,
        hot: true
    },


    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/index.html"),
                publicPath: '',
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
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "./src/index.html") }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' })
    ],


    module: {
        rules: [

            {
                //! the target html file is defined inside the HtmlWebpackPlugin
                //! assets in src attricutes will be resolve just make sure the path
                //! is relative not absolute, needs file loader depending on file type
                test: /\.html$/,
                loader: "html-loader"
            },


            {
                // !this will create a css file and inject a link tag on html on head tag
                // !pointing to the output css file
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
                // !pointing to the output css file
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ],
            },


            {
                // FONTS: https://chriscourses.com/blog/loading-fonts-webpack
                // !local/downloaded fonts will be copied to the outputPath
                // !once its imported via @import or src() inside a css/scss
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
                // !once its imported via src() inside a css/scss
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },


            {
                // local/downloaded videos will be copied to the outputPath
                // !once it imported via src() inside a css/scss
                test: /\.(mp4|ogg|webm)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/videos/'
                        }
                    }
                ]
            },

        ]
    }
};