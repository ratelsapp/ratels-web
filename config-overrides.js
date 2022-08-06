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

let canisters;
const webEnv = {};
const network = process.env.REACT_APP_IC_NETWORK;
function initCanisterIds() {
  const canistersMap = {
    localCanisters() {
      try {
        return require(path.resolve(".dfx", "local", "canister_ids.json"));
      } catch {
        return {};
      }
    },
    testCanisters() {
      try {
        require(path.resolve(".dfx", "test", "canister_ids.json"));
      } catch (e) {
        return {};
      }
    },
    icCanisters() {
      try {
        return require(path.resolve("canister_ids.json"));
      } catch (e) {
        return {};
      }
    },
  };
  canisters = canistersMap[`${network}Canisters`];
  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] = canisters[canister][network];
    webEnv[`process.env.${canister.toUpperCase() + "_CANISTER_ID"}`] = JSON.stringify(canisters[canister][network]);
  }
}

initCanisterIds();

// List of all aliases for canisters. This creates the module alias for
// the `import ... from "@dfinity/ic/canisters/xyz"` where xyz is the name of a
// canister.
const aliases = Object.entries(dfxJson.canisters).reduce((acc, [name, _value]) => {
  // Get the network name, or `local` by default.
  const outputRoot = path.join(__dirname, ".dfx", network, "canisters", name);

  return {
    ...acc,
    ["dfx-generated/" + name]: path.join(outputRoot, `index.js`),
    Canisters: path.resolve(__dirname, "./.vessel/canister/master/.dfx/local/"),
    DogStakingService: path.resolve(__dirname, "./.vessel/staking/master"),
    DogStakingCanisters: path.resolve(__dirname, "./.vessel/staking/master/.dfx/local/"),
    buffer: path.resolve(__dirname, "./node_modules/buffer"),
    process: "process/browser.js",
    "canister.did": path.join(outputRoot, name + ".did.js"),
    "@": path.resolve(__dirname, "./src"),
    "ui-component": path.resolve(__dirname, "./src/ui-component"),
    store: path.resolve(__dirname, "./src/store"),
    constants: path.resolve(__dirname, "./src/constants"),
    assets: path.resolve(__dirname, "./src/assets"),
    hooks: path.resolve(__dirname, "./src/hooks"),
    utils: path.resolve(__dirname, "./src/utils"),
  };
}, {});

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
      }),
      new webpack.DefinePlugin({
        ...webEnv,
      })
    )
  ),
  devServer: overrideDevServer(addProxy()),
};
