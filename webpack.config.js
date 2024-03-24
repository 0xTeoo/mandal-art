const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/app.ts", "./src/styles/main.scss"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: "./src/images/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images", // 이미지를 출력할 경로 설정 (옵션)
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  mode: "development",
};
