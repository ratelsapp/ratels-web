import * as actionTypes from "./actions";

const initialState = {
  pool: [],
  loading: false,
  finish: false,
};

const poolReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_POOL:
      return {
        ...state,
        pool: action.pool,
        loading: false,
        finish: true,
      };
    case actionTypes.LOAD_POOL_STATUS:
      return {
        ...state,
        loading: action.loading,
      };
    case actionTypes.LOAD_POOL_LOADED:
      return {
        ...state,
        finish: action.finish,
      };
    default:
      return state;
  }
};

export default poolReducer;
