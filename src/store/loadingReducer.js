import * as actionTypes from "./actions";

const initialState = {
  open: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_OPEN:
      return {
        ...state,
        open: true,
      };
    case actionTypes.LOADING_CLOSE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
