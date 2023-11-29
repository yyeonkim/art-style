const developmentConfig = require("./webpack.dev.config.js");
const productionConfig = require("./webpack.prod.config.js");

module.exports = (env, { mode }) => {
  return mode === "production" ? productionConfig : developmentConfig;
};
