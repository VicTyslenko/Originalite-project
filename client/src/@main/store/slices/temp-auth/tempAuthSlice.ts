import { actionFetchTempAuth } from "@main/store/actions/authActions";
import { updateCustomer } from "@main/store/actions/customersActions";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { type InitialStateProps } from "./models";

const initialState: InitialStateProps = {
  tempData: null,
  error: null,
};

const tempAuthSlice = createSlice({
  name: "tempAuth",
  initialState,
  reducers: {
    setTempAuth(state, action) {
      state.tempData = action.payload;
    },
    clearTempAuth(state) {
      state.tempData = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(actionFetchTempAuth.pending, state => {
      state.tempData = null;
    });

    builder.addCase(actionFetchTempAuth.fulfilled, (state, action) => {
      state.tempData = action.payload;
    });
    builder.addCase(actionFetchTempAuth.rejected, (state, action) => {
      state.error = action.payload as AxiosError;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.tempData = action.payload;
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.error = action.payload as AxiosError;
    });
  },
});

export const { setTempAuth, clearTempAuth } = tempAuthSlice.actions;
export default tempAuthSlice.reducer;
