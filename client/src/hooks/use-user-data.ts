import jwt_decode from "jwt-decode";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { type UserData } from "shared/models/user.models";

type UserProps = Omit<UserData, "customerNo" | "login" | "gender" | "birthday">;

export const useUserData = () => {
  const tempAuth = useStoreSelector(state => state.tempAuth.tempData);

  const isAuth = useStoreSelector(state => state.auth.data);

  const token = isAuth?.token || tempAuth?.token;

  if (!token) {
    return null;
  }

  const user = jwt_decode<UserProps>(token);
  

  return user;
};
