import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { registerFetchData } from "../../actions/registrationActions";
import { type InitialStateProps } from "../auth/models";

const initialState: InitialStateProps = {
  data: null,
  status: "loading",
  error: null,
};

const registrationReducer = createSlice({
  name: "registration",
  initialState,
  reducers: {
    clearDataRegister(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerFetchData.pending, state => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(registerFetchData.fulfilled, (state, { payload }) => {
      state.status = "loaded";
      state.data = payload;
    });
    builder.addCase(registerFetchData.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload as AxiosError;
    });
  },
});

export const { clearDataRegister } = registrationReducer.actions;
export default registrationReducer.reducer;
