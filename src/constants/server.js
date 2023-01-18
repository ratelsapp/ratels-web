const { port, host: originHost } = require("./host");

export const hostMap = {
  local: `${originHost}:${port}`,
  // test: "https://dtest.app",
  // test: "https://api.ratels.app",
  ic: "https://ic0.app",
  // ic: "https://api.ratels.app",
};

// export const network = process.env.REACT_APP_IC_NETWORK;
export const network = "ic";

export const host = hostMap[network];
