import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

export function useIsLogin() {
  return useSelector((state) => state.cache.isLoggedIn);
}

export function isRegister() {
  const { mnemonic } = useSelector((state) => state.wallet);
  return !!mnemonic;
}

export function useWalletType() {
  return useSelector((state) => state.auth.walletType);
}

export function useLoginStatusManager() {
  const isLogin = useIsLogin();
  const dispatch = useDispatch();

  const updateLoginStatusCallback = useCallback(
    async (isLogin) => await dispatch(updateLoginStatus(isLogin)),
    [dispatch]
  );

  return [isLogin, updateLoginStatusCallback];
}

export function useUserLogout() {
  const dispatch = useDispatch();
  return useCallback(async () => await dispatch(logout()), [dispatch]);
}
