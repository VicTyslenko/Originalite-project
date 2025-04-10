import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect } from "react";

// import
import MainRoutes from "./router";
import { getCart } from "./store/actions/cart/cartActions";

function Main() {
  const dispatch = useStoreDispatch();

  const user = useUserData();

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("http://localhost:4444/api/customers/refresh", {
          credentials: "include", 
        });

        const data = await res.json(); 
    
      } catch (err) {
        console.log("ERROR:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [user, dispatch]);

  return <MainRoutes />;
}

export default Main;
