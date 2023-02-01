import * as actionTypes from "./actions";

const initialState = {
  action: false,
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  variant: "default",
  alertSeverity: "success",
  transition: "Fade",
  close: true,
  actionButton: false,
  autoHideDuration: 3000,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SNACKBAR_OPEN:
      return {
        ...state,
        action: !state.action,
        open: true,
        message: action.message ? action.message : initialState.message,
        anchorOrigin: action.anchorOrigin ? action.anchorOrigin : initialState.anchorOrigin,
        variant: action.variant ? action.variant : initialState.variant,
        alertSeverity: action.alertSeverity ? action.alertSeverity : initialState.alertSeverity,
        transition: action.transition ? action.transition : initialState.transition,
        close: false,
        actionButton: action.actionButton ? action.actionButton : initialState.actionButton,
      };
    case actionTypes.SNACKBAR_CLOSE:
      return {
        ...state,
        action: !state.action,
        open: false,
        message: "",
        close: true,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
