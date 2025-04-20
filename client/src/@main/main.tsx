import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";

import { refreshToken } from "shared/utils";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";

function Main() {
  const dispatch = useStoreDispatch();
  const user = useUserData();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user]);

  // useEffect(() => {
  //   if (!user) {
  //     (async () => {
  //       await refreshToken();
  //     })();
  //   }
  // }, [user]);

  return <MainRoutes />;
}

export default Main;
