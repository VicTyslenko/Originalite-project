import jwt_decode from "jwt-decode";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { type UserData } from "shared/models/user.models";

export const useUserData = () => {
  const isAuth = useStoreSelector(state => state.auth.data);
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const token = isAuth?.accessToken;

  const decodedUser = !token ? null : jwt_decode<UserData>(token);

  return { user: decodedUser, isLoggedOut };
};
