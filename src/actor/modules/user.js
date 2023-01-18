import { Actor } from "actor/Actor";
import { idlFactory } from "../../declarations/user.did.js";

export const userActor = async (canisterId, identity) => {
  return await Actor.create({
    canisterId,
    identity,
    idlFactory,
  });
};
