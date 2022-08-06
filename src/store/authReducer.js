import * as actionTypes from "./actions";

const initialState = {
  account: "",
  accounts: [],
  logined: false,
  identity: null,
  loginType: "",
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        account: action.account,
        accounts: action.accounts || [],
        logined: action.logined || false,
        identity: action.identity,
        loginType: action.loginType,
        // loading: action.loading || false,
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: action.loading || false,
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        account: "",
        accounts: [],
        logined: false,
        identity: null,
        loginType: "",
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
