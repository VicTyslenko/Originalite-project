import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { StatementSync } from "node:sqlite";
import type { UserModels } from "shared/models/user.models";

import { actionFetchAuth } from "../../actions/authActions";
import { updateCustomer } from "../../actions/customersActions";
import { registerFetchData } from "../../actions/registrationActions";
import { type InitialStateProps } from "./models";

const initialState: InitialStateProps = {
  data: null,
  status: "loading",
  error: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearDataAuth(state) {
      state.data = null;
      state.error = null;
    },

    signOut(state) {
      state.data = null;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(registerFetchData.pending, state => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(registerFetchData.fulfilled, (state, action: PayloadAction<UserModels>) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(registerFetchData.rejected, (state, { payload }) => {
      state.status = "error";

      state.error = payload as AxiosError;
    });

    builder.addCase(actionFetchAuth.pending, state => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(actionFetchAuth.fulfilled, (state, action: PayloadAction<UserModels>) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(actionFetchAuth.rejected, (state, { payload }) => {
      state.status = "error";
      state.error = payload as AxiosError;
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

export const { clearDataAuth, clearErrorAuth } = authReducer.actions;
export default authReducer.reducer;
