import { updateDrawerWidth } from "./actions";
import { initialState } from "./states";

import { createReducer } from "@reduxjs/toolkit";

export default createReducer(initialState, (builder) => {
  builder.addCase(updateDrawerWidth, (state, { payload }) => {
    state.drawerWidth = payload;
  });
});
