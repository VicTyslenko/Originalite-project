import type { UpdateCustomerProps } from "@profile/containers/MyProfile/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type UserModels } from "shared/models/user.models";

import axiosInstance from "../../../services/api/axios";

type ParamsProps = {
  params: UpdateCustomerProps;
  _id: string;
};
export const updateCustomer = createAsyncThunk<UserModels, ParamsProps>(
  "customers/updateCustomer",
  async ({ _id, params }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/customers/${_id}`, params);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCustomer = createAsyncThunk<UserModels, void>(
  "auth/actionFetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/customers/me");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
