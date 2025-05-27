import { clearDataAuth } from "@main/store/slices/auth/authSlice";
import { clearCart } from "@main/store/slices/cart/cartSlice";
import { clearTempAuth } from "@main/store/slices/temp-auth/tempAuthSlice";
import { type Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "services/api/axios";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await publicInstance.post("customers/logout");

      dispatch(clearTempAuth());
      dispatch(clearDataAuth());
      dispatch(clearCart());

      localStorage.setItem("keepSignedIn", String(false));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return { signOut };
};

export const useGetMobileSize = (size: number | Breakpoint) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return { isMobile };
};
