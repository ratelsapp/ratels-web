import { UPDATE_WALLET_ACCOUNT, UPDATE_LOGIN_STATUS } from "./actions";
import initCacheState from "./states";

const cacheReducer = (state = initCacheState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_WALLET_ACCOUNT:
      return {
        ...state,
        account: payload,
      };
    case UPDATE_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: payload,
      };
    default: {
      return state;
    }
  }
};

export default cacheReducer;
