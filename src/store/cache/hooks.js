import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { updateWalletAccount } from "./actions";

export function useCacheAccount() {
  return useSelector((state) => state.cache.account);
}

export function useCacheAccountManager() {
  const account = useCacheAccount();
  const dispatch = useDispatch();

  const cacheAccountCallback = useCallback(async (account) => await dispatch(updateWalletAccount(account)), [dispatch]);

  return [account, cacheAccountCallback];
}
