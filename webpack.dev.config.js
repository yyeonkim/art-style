const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_TS = "./src/client/ts";

module.exports = {
  mode: "development",
  entry: `${BASE_TS}/main.ts`,
  module: {
    rules: [
      // TS 파일 로더 설정
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Sass 파일 로더 설정
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
