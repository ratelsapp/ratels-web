import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import allReducer, { cacheReducer } from "./reducer";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["global", "snackbar", "loading"],
};

const cachePersistConfig = {
  key: "cache",
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  ...allReducer,
  cache: persistReducer(cachePersistConfig, cacheReducer),
});

const PersistReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(PersistReducer, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);

export default store;
