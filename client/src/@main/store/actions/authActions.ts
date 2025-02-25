import { type InitialProps } from "@main/containers/RegisterForm/extensions/models";
import { type UserLoginProps } from "@main/store/models";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

export const actionFetchAuth = createAsyncThunk<UserLoginProps, InitialProps, { rejectValue: { message: string } }>(
  "auth/actionFetchData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/customers/login", params);
      console.log("data", data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
// login user and save to session storage
export const actionFetchTempAuth = createAsyncThunk<UserLoginProps, InitialProps, { rejectValue: { message: string } }>(
  "auth/actionFetchTempData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/customers/login", params);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
