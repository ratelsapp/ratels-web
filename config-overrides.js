const {
  override,
  addWebpackAlias,
  useBabelRc,
  addWebpackPlugin,
  removeModuleScopePlugin,
  overrideDevServer,
} = require("customize-cra");
const path = require("path");
const webpack = require("webpack");
const dfxJson = require("./dfx.json");
const { port, host } = require("./src/constants/host");

const aliases = Object.entries(dfxJson.canisters).reduce(
  (acc, [name, _value]) => {
    return {
      ...acc,
      buffer: path.resolve(__dirname, "./node_modules/buffer"),
      process: "process/browser.js",
      component: path.resolve(__dirname, "./src/component"),
      store: path.resolve(__dirname, "./src/store"),
      constants: path.resolve(__dirname, "./src/constants"),
      assets: path.resolve(__dirname, "./src/assets"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
    };
  },
  {}
);

const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    "/api": {
      target: `${host}:${port}`,
      changeOrigin: true,
    },
  };

  return configFunction;
};

module.exports = {
  webpack: override(
    removeModuleScopePlugin(),
    addWebpackAlias(aliases),
    useBabelRc(),
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser.js",
      })
    )
  ),
  devServer: overrideDevServer(addProxy()),
};
