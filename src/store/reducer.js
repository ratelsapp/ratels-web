import customizationReducer from "./customizationReducer";
import snackbarReducer from "./snackbarReducer";
import globalReducer from "./global/reducer";
import _cacheReducer from "./cache/reducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import poolReducer from "./poolReducer";

export const cacheReducer = _cacheReducer;

export default {
  customization: customizationReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  global: globalReducer,
  auth: authReducer,
  pool: poolReducer,
};
