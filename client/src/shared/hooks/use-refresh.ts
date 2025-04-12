import { setAuth } from "@main/store/slices/auth/authSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import instance from "services/api/axios";

import { useStoreSelector } from "./global/use-store-selector";

export const useRefreshToken = () => {
  const dispatch = useStoreDispatch();

  const authData = useStoreSelector(state => state.auth.data);

  const refresh = async function () {
    try {
      const response = await instance.get("customers/refresh");

      if (response.data) {
        const accessToken = response.data.accessToken;

        dispatch(
          setAuth({
            ...authData,
            accessToken,
          }),
        );

        return accessToken;
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  };

  return refresh;
};
