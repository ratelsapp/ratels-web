import { CANISTER_NAMES } from "constants/canister";
import { Actor } from "actor/Actor";

export const userActor = async (canisterId, identity) => {
  return await Actor.create({
    canisterId,
    identity,
    canisterName: CANISTER_NAMES.user,
  });
};
