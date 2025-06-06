import { clearDataAuth } from "@main/store/slices/auth/authSlice";
import { clearCart } from "@main/store/slices/cart/cartSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "services/api/axios";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await publicInstance.post("customers/logout");

      dispatch(clearDataAuth());
      dispatch(clearCart());

      localStorage.removeItem("keepSignedIn");
      localStorage.removeItem("root");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { signOut };
};
