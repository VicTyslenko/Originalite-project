import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";

function Main() {
  const dispatch = useStoreDispatch();

  const user = useUserData();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  return <MainRoutes />;
}

export default Main;
