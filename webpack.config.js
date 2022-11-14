const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: ".src/assets/js/index.js"
    },
    oninput: {
        clean: true,
        filiname: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
        static: './src',
        compress: true,
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ]
    },
    plagins: [
        new HtmlWebpackPlugin({
            title: "Got Of War",
            template: "src/index.html",
        }),
    ],
};