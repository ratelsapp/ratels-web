// @ts-nocheck
import { network } from "./server";
// console.log(network, "--network");
let CanisterIdsJson = {};
try {
  CanisterIdsJson = require("DogStakingService/.dfx/local/canister_ids.json");
  if (network === "ic") {
    CanisterIdsJson = require("DogStakingService/canister_ids.json");
  } else if (network === "test") {
    CanisterIdsJson = require("DogStakingService/.dfx/test/canister_ids.json");
  }
} catch {}

const canisterIds = {};
for (const canister in CanisterIdsJson) {
  canisterIds[canister] = CanisterIdsJson[canister][network];
}

export const getCanisterId = (canisterName) => canisterIds[canisterName];

export const CANISTER_NAMES = {
  user: "user",
};
export { canisterIds };
