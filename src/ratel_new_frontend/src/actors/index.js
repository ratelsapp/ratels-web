import { Actor, HttpAgent } from "@dfinity/agent";

import { idlFactory } from "../../../declarations/ratel_new_backend/ratel_new_backend.did.js";

const host = "https://ic0.app/";

const canister_ids = require("../../../../.dfx/local/canister_ids.json");

const agent = new HttpAgent({
  host: host,
  // identity: "xxxx", // If need a user's identity
});

export const actor = Actor.createActor(idlFactory, {
  canisterId: "viz6v-ziaaa-aaaak-qbhqa-cai", 
  agent,
});