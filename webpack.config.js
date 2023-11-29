import developmentConfig from "./webpack.dev.config.js";
import productionConfig from "./webpack.prod.config.js";

export default (env, { mode }) => {
  return mode === "production" ? productionConfig : developmentConfig;
};
