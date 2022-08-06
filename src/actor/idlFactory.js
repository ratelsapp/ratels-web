import { CANISTER_NAMES } from "../constants/canister";

let idlFactories = {};

Object.values(CANISTER_NAMES).forEach((canisterName) => {
  const { idlFactory } = require(`Canisters/${canisterName}.did.js`);
  idlFactories[canisterName] = idlFactory;
});
export const getIdlFactory = (canisterName) => idlFactories[canisterName];

export default idlFactories;
