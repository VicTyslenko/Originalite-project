import jwt_decode from "jwt-decode";
import { useMemo } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { type UserData } from "shared/models/user.models";

export const useUserData = () => {
  const isAuth = useStoreSelector(state => state.auth.data);
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const token = isAuth?.accessToken;

  // useMemo prevents endless loop in the components when getting user

  const decodedUser = useMemo(() => {
    if (!token) return null;
    return jwt_decode<UserData>(token);
  }, [token]);

  return { user: decodedUser, isLoggedOut };
};
