import type { RegisterProps } from "@main/containers/RegisterForm/models";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../../services/api/axios";

type ResponseData = {
  success: boolean;
  message: string;
};

export const registerFetchData = createAsyncThunk<ResponseData, RegisterProps>(
  "register/actionFetchData",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/customers/", {
        ...params,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
