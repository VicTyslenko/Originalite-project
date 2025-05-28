import type { LoginProps } from "@main/containers/RegisterForm/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserModels } from "shared/models/user.models";

import axiosInstance from "../../../services/api/axios";

export const actionFetchAuth = createAsyncThunk<UserModels, LoginProps, { rejectValue: { message: string } }>(
  "auth/actionFetchData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/customers/login", params);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
