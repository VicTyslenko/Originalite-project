import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { LocalStorage } from "utils/local-storage";

import { refreshToken } from "shared/utils";

import { useStoreSelector } from "./global/use-store-selector";

export const useAutoLogin = () => {
  const { user } = useUserData();

  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const keepSignedIn = LocalStorage.getKeepSignIn();

  useEffect(() => {
    if (!user && !isLoggedOut && keepSignedIn) {
      refreshToken().catch(() => {});
    }
  }, [user, isLoggedOut, keepSignedIn]);
};
