import { useSelector } from "react-redux";
import { useMemo, useState, useCallback } from "react";
import { decryptMnemonic, getMnemonic } from "utils";
const ICPSwapMnemonic = {};

export function useMnemonic() {
  const wallet = useSelector((state) => state.wallet);

  return useCallback(
    (password) => {
      if (!password) return null;

      let mnemonic = null;
      try {
        // TODO fix mnemonic decrypt utf-8 error
        mnemonic = decryptMnemonic(password)(wallet.mnemonic);
      } catch (err) {
        console.log(err);
      }

      return mnemonic;
    },
    [wallet]
  );
}

export async function getIdentityByPassword(password) {
  const mnemonic = getMnemonic(password);
  if (mnemonic) return await ICPSwapMnemonic.toIdentity(mnemonic);
  return null;
}

export function useIdentity() {
  const getMnemonic = useMnemonic();
  const [identity, setIdentity] = useState(null);

  const initIdentity = useCallback(
    async (password) => {
      const identity = await getIdentityByPassword(password);
      setIdentity(identity);
    },
    [getMnemonic]
  );

  return [useMemo(() => identity, [identity]), initIdentity];
}
