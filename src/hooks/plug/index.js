import { useEffect, useState, useMemo } from "react";
import { host } from "constants/server";
import { Principal } from "@dfinity/principal";
import { canisterIds as canisterIdMap } from "constants/canister";
import { useWalletType } from "store/auth/hooks";
import { WalletType } from "constants/wallet";
import store from "../../store";
import { updateLockStatus } from "store/session/actions";

export async function initPluginConnect(whitelist) {
  const isConnected = await requestConnect(whitelist);

  if (isConnected) {
    const canisterIds = Object.values(canisterIdMap ?? {});
    await createPlugAgent(canisterIds);
    store.dispatch(updateLockStatus(false));
  }

  return isConnected;
}

export async function requestConnect(whitelist) {
  const canisterIds = Object.values(canisterIdMap ?? {});

  const publicKey = await window.ic.plug.requestConnect({
    whitelist: [...(whitelist ?? []), ...canisterIds],
  });

  return Boolean(publicKey);
}

export async function createPlugAgent(whitelist) {
  const plugConnected = await getPlugConnected();

  const _whitelist = [...(whitelist ?? [])];

  let requestConnectSuccess = true;
  if (!plugConnected) {
    requestConnectSuccess = await requestConnect(_whitelist);
  }

  if (requestConnectSuccess) {
    await window.ic.plug.createAgent({
      whitelist: _whitelist,
      host: host,
    });
  }
}

export function useInitialPlugAgent(whitelist) {
  const walletType = useWalletType();
  const [agentLoading, setAgentLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (walletType && walletType === WalletType.PLUG && !window.ic?.plug?.agent) {
        setAgentLoading(true);
        await createPlugAgent(whitelist);
        setAgentLoading(false);
      } else if (walletType === WalletType.ICP_SWAP) {
        setAgentLoading(false);
      }
    })();
  }, [walletType, setAgentLoading]);

  return agentLoading;
}

export async function getAccountPrincipal() {
  return await window.ic.plug.agent.getPrincipal();
}

export function useAccountPrincipal() {
  const [principal, setPrincipal] = (useState < null) | (Principal > null);

  useEffect(() => {
    (async () => {
      const principal = await getAccountPrincipal();
      setPrincipal(principal);
    })();
  }, []);

  return principal;
}

export async function getPlugConnected() {
  if (window.ic?.plug) {
    const isConnected = await window.ic.plug.isConnected();
    return isConnected;
  }
  return false;
}

export function usePlugConnected() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    (async () => {
      const plugConnected = await getPlugConnected();
      setIsConnected(plugConnected);
    })();
  }, []);

  return useMemo(() => isConnected, [isConnected]);
}
