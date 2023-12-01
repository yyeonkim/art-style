const path = require("path");

const BASE_TS = "./src/client/ts";

module.exports = {
  mode: "development",
  entry: {
    main: `${BASE_TS}/main.ts`,
    header: `${BASE_TS}/header.ts`,
    category: `${BASE_TS}/category.ts`,
    home: `${BASE_TS}/home.ts`,
  },
  output: {
    path: path.resolve(__dirname, "dist", "js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
