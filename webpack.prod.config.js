const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const BASE_TS = "./src/client/ts";

module.exports = {
  mode: "production",
  entry: `${BASE_TS}/main.ts`,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      // TS 파일 로더 설정
      {
        test: /\.ts?$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      // Sass 파일 로더 설정
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 주석을 별도의 파일로 분리하지 않는다.
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
