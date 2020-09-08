const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    process.env.NODE_ENV = options.mode;

    return {
        entry: "./front/index.js",
        resolve: {
            alias: {
                vue$: "vue/dist/vue.esm.js",
            },
        },
        module: {
            rules: [
                { // Vue
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                { // CSS
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
                { // Others
                    test: /\.(eot|woff2?|ttf)$/,
                    use: "file-loader",
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: "Vinton",
                inject: true,
            }),
        ],
    };
};
