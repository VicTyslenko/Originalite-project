import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";

import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";
import { getWishlist } from "./store/actions/wishlistActions";

function Main() {
  const dispatch = useStoreDispatch();

  const user = useUserData();

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getWishlist());
    }
  }, [user, dispatch]);

  return <MainRoutes />;
}

export default Main;
