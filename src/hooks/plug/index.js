import { useEffect, useState, useMemo } from "react";
import { host } from "constants/server";
import { Principal } from "@dfinity/principal";
import { useWalletType } from "store/auth/hooks";
import { WalletType } from "constants/wallet";
import store from "../../store";
import { updateLockStatus } from "store/session/actions";

export async function initPluginConnect(whitelist) {
  const isConnected = await requestConnect(whitelist);

  if (isConnected) {
    await createPlugAgent([]);
    store.dispatch(updateLockStatus(false));
  }

  return isConnected;
}

export async function requestConnect(whitelist) {
  const publicKey = await window.ic.plug.requestConnect({
    whitelist: [...(whitelist ?? [])],
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
