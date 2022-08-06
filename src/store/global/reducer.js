import { updateXDR2USD, updateDrawerWidth, updateICPBlocks, updateICPPriceList } from "./actions";
import { initialState } from "./states";

import { createReducer } from "@reduxjs/toolkit";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateXDR2USD, (state, { payload }) => {
      state.xdr_usdt = payload;
    })
    .addCase(updateDrawerWidth, (state, { payload }) => {
      state.drawerWidth = payload;
    })
    .addCase(updateICPBlocks, (state, { payload }) => {
      state.blocks = payload.blocks;
      state.secondBlocks = payload.secondBlocks;
    })
    .addCase(updateICPPriceList, (state, { payload }) => {
      state.ICPPriceList = payload;
    });
});
