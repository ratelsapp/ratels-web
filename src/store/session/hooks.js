import { useCallback } from "react";
import { updateLoginAccount } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";

export function useAccount() {
  return useAppSelector((state) => state.session.account);
}

export function useAccountManager() {
  const account = useAccount();
  const dispatch = useAppDispatch();

  const updateAccount = useCallback(
    async (account) => {
      await dispatch(updateLoginAccount(account));
    },
    [dispatch]
  );

  return [account, updateAccount];
}
