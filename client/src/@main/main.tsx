import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { refreshToken } from "shared/utils";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";
import { setAuth } from "./store/slices/auth/authSlice";

function Main() {
  const dispatch = useStoreDispatch();
  const { user } = useUserData();
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  const keepSignedIn = localStorage.getItem("keepSignedIn") === "true";

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user]);

  useEffect(() => {
    if (!user && !isLoggedOut && keepSignedIn) {
      (async () => {
        try {
          const token = await refreshToken();

          setAuth(token);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [user, isLoggedOut, keepSignedIn]);

  return <MainRoutes />;
}

export default Main;
