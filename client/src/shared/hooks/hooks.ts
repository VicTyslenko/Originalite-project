import { clearDataAuth } from "@main/store/slices/auth/authSlice";
import { clearCart } from "@main/store/slices/cart/cartSlice";
import { clearDataRegister } from "@main/store/slices/registration/registrationSlice";
import { clearTempAuth } from "@main/store/slices/temp-auth/tempAuthSlice";
import { type Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";

import { LocalStorage } from "shared/utils";

export const useLogout = () => {
  const dispatch = useStoreDispatch();

  const singOut = () => {
    dispatch(clearTempAuth());
    dispatch(clearDataAuth());
    dispatch(clearCart());
    dispatch(clearDataRegister());

    LocalStorage.deleteAuthToken();
    LocalStorage.deleteTempAuthToken();
  };

  return { singOut };
};

export const useGetMobileSize = (size: number | Breakpoint) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return { isMobile };
};
