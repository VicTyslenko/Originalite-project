import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";

import { refreshToken } from "shared/utils";

import { useStoreSelector } from "./global/use-store-selector";

export const useAutoLogin = () => {
  const { user } = useUserData();

  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const keepSignedIn = localStorage.getItem("keepSignedIn") === "true";

  useEffect(() => {
    if (!user && !isLoggedOut && keepSignedIn) {
      (async () => {
        try {
          await refreshToken();
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user, isLoggedOut, keepSignedIn]);
};
