import { Actor } from "@dfinity/agent";

export function createBaseActor({ canisterId, idlFactory, actorOptions, agent }) {
  return Actor.createActor(idlFactory, {
    agent: agent,
    canisterId,
    ...(actorOptions ?? {}),
  });
}
