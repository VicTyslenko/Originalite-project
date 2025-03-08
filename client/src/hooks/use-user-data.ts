import jwt_decode from "jwt-decode";
import { useMemo } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { type UserData } from "shared/models/user.models";

export const useUserData = () => {
  const tempAuth = useStoreSelector(state => state.tempAuth.tempData);

  const isAuth = useStoreSelector(state => state.auth.data);

  const token = isAuth?.token || tempAuth?.token;

  // useMemo prevents endless loop in the components when getting user

  return useMemo(() => {
    if (!token) return null;
    return jwt_decode<UserData>(token);
  }, [token]);
};
