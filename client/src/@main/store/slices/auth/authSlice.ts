import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { UserModels } from "shared/models/user.models";

import { actionFetchAuth } from "../../actions/authActions";
import { updateCustomer } from "../../actions/customersActions";
import { type InitialStateProps } from "./models";

const initialState: InitialStateProps = {
  data: null,
  status: "loading",
  error: null,
  loader: false,
  isLoggedOut: true,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearDataAuth(state) {
      state.data = null;
      state.error = null;
      state.isLoggedOut = true;
    },

    setAuth(state, action: PayloadAction<UserModels>) {
      state.data = action.payload;
      state.isLoggedOut = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(actionFetchAuth.pending, state => {
      state.status = "loading";
      state.data = null;
      state.loader = true;
    });
    builder.addCase(actionFetchAuth.fulfilled, (state, action: PayloadAction<UserModels>) => {
      state.status = "loaded";
      state.data = action.payload;
      state.isLoggedOut = false;
      state.loader = false;
    });

    builder.addCase(actionFetchAuth.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload as AxiosError;
      state.loader = true;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<UserModels>) => {
      state.data = action.payload;
      state.error = null;
    });

    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.error = action.payload as AxiosError;
    });
  },
});

export const { clearDataAuth, setAuth } = authReducer.actions;

export default authReducer.reducer;
