const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        // property will be the name of the output file
        main: './webpack/main.js',
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: '[name].[contenthash].bundle.js',
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html")
    })],
    module: {
        rules: [
            {
                // the target html file is defined inside the HtmlWebpackPlugin
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    attributes: false,
                }
            },
            {
                // will check for every .css file starting from the entry point
                // !this will not create a css file, but instead js will inject style tag
                // !upon load of the html
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                // will check for every .css file starting from the entry point
                // !this will not create a css file, but instead js will inject style tag
                // !upon load of the html
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
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