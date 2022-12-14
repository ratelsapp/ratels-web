import { createBaseActor } from "./BaseActor";
import { host as defaultHost } from "constants/server";
import { getCanisterId } from "constants/canister";
import { getIdlFactory } from "./idlFactory";
import { HttpAgent } from "@dfinity/agent";
import store from "../store";
import { WalletType } from "constants/wallet";
import { createPlugAgent } from "hooks/plug";

export class Actor {
  static async create({ canisterId, canisterName, host, identity, idlFactory: _idlFactory }) {
    const { auth } = store?.getState() ?? {};
    const walletType = auth?.walletType ?? "ICPSwap";
    const _canisterId = canisterId ?? getCanisterId(canisterName);

    let idlFactory = null;
    if (_idlFactory) {
      idlFactory = _idlFactory;
    } else {
      idlFactory = getIdlFactory(canisterName);
    }

    let actor = null;
    const anonymousAgent = new HttpAgent({
      ...(host ? { host } : defaultHost),
    });
    if (process.env.REACT_APP_IC_NETWORK !== "ic") {
      await anonymousAgent.fetchRootKey().catch((err) => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
      });
    }
    if (walletType === WalletType.PLUG) {
      if (identity) {
        await createPlugAgent([_canisterId]);

        window.ic.plug.agent.fetchRootKey();

        actor = await window.ic.plug.createActor({
          canisterId: _canisterId,
          interfaceFactory: idlFactory,
        });

      } else {
        actor = createBaseActor({
          canisterId: _canisterId,
          idlFactory: idlFactory,
          agent: anonymousAgent,
        });
      }
    } else {
      const agent = new HttpAgent({
        ...(host ? { host } : defaultHost),
        identity,
      });
      if (process.env.REACT_APP_IC_NETWORK !== "ic") {
        await agent.fetchRootKey().catch((err) => {
          console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
          console.error(err);
        });
      }
      actor = createBaseActor({
        canisterId: _canisterId,
        idlFactory: idlFactory,
        agent: identity ? agent : anonymousAgent,
      });
    }

    return actor;
  }
}
