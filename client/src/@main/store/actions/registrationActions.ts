import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { UserModels } from "shared/models/user.models";

import axiosInstance from "../../../services/api/axios";

export const registerFetchData = createAsyncThunk("register/actionFetchData", async (params, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post("/customers/", params);

    return data as UserModels;
  } catch (err) {
    const axiosError = err as AxiosError;
    return rejectWithValue(axiosError?.response?.data);
  }
});
