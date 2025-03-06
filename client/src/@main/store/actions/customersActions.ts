import type { UpdateCustomerProps } from "@profile/containers/MyProfile/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type UserModels } from "shared/models/user.models";
import type { RootState } from "store";

import axiosInstance from "../../../services/api/axios";

type ParamsProps = {
  params: UpdateCustomerProps;
  _id: string;
};
export const updateCustomer = createAsyncThunk<UserModels, ParamsProps, { state: RootState }>(
  "customers/updateCustomer",
  async ({ _id, params }, { getState, rejectWithValue }) => {
    const { auth, tempAuth } = getState();

    const token = auth.data?.token || tempAuth?.tempData?.token;

    try {
      const { data } = await axiosInstance.put(`/customers/${_id}`, params, {
        headers: {
          Authorization: token,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCustomer = createAsyncThunk<UserModels, void, { state: RootState }>(
  "auth/actionFetchUserData",
  async (_, { getState, rejectWithValue }) => {
    const { auth, tempAuth } = getState();

    const token = auth.data?.token || tempAuth?.tempData?.token;

    try {
      if (token) {
        const { data } = await axiosInstance.get("/customers/me", {
          headers: {
            Authorization: token,
          },
        });
        return data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
