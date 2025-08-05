import jwt_decode from "jwt-decode";
import { useMemo } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { type UserData } from "shared/models/user.models";

export const useUserData = () => {
  const isAuth = useStoreSelector(state => state.auth.data);

  const token = isAuth?.accessToken;

  const decodedUser = useMemo(() => {
    return !token ? null : jwt_decode<UserData>(token);
  }, [token]);

  return { user: decodedUser, isAuth };
};
