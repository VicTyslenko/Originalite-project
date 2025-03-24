import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";

function Main() {
  const dispatch = useStoreDispatch();
  const order = useStoreSelector(state => state.orders.data);

  console.log("order", order);
  const user = useUserData();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  return <MainRoutes />;
}

export default Main;
