import { drawerWidth } from "constants/theme";
import { DEFAULT_LOCALE } from "constants/locales";
import BigNumber from "bignumber.js";

export const initialState = {
  drawerWidth,
  xdr_usdt: 1.43,
  ICPPriceList: [],
  tokenList: [],
  hasBeenClaimTestToken: false,
  requestTokenList: [],
  swapTokenList: [],
  ICSBalance: new BigNumber(0),
  ICPBalance: new BigNumber(0),
  userLocale: DEFAULT_LOCALE,
  allowance: [],
  faucetTokens: [],
  userCounter: "0",
  secondBlocks: "0",
  blocks: "0",
};
