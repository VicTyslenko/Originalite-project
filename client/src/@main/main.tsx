import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { useAxiosPrivate } from "shared/hooks/use-axios-private";
import { useRefreshToken } from "shared/hooks/use-refresh";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";

function Main() {
  const dispatch = useStoreDispatch();
  useAxiosPrivate();
  const user = useUserData();

  const refresh = useRefreshToken();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log("user", user);
    if (!user) {
      (async () => {
        try {
          await refresh();
        } catch (err) {
          console.warn("No active session");
        }
      })();
    }
  }, [user, refresh]);
  return <MainRoutes />;
}

export default Main;
