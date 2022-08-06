export const UPDATE_WALLET_ACCOUNT = "UPDATE_WALLET_ACCOUNT";
export const UPDATE_LOGIN_STATUS = "UPDATE_LOGIN_STATUS";

export const updateWalletAccount = (payload) => ({
  type: UPDATE_WALLET_ACCOUNT,
  payload,
});

export const updateLoginStatus = (payload) => ({
  type: UPDATE_LOGIN_STATUS,
  payload,
});
