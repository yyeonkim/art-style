import path from "path";
const __dirname = path.resolve();

const BASE_TS = "./src/client/ts";

export default {
  mode: "development",
  entry: `${BASE_TS}/main.ts`,
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
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
};
