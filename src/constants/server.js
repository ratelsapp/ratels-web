const { port, host: originHost } = require("./host");

export const hostMap = {
  local: `${originHost}:${port}`,
  ic: "https://ic0.app",
};

export const network = "ic";

export const host = hostMap[network];
