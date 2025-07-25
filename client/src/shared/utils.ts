import { setAuth } from "@main/store/slices/auth/authSlice";
import { type Breakpoint, useMediaQuery, useTheme } from "@mui/material";
import { publicInstance } from "services/api/axios";

export const useGetMobileSize = (size: number | Breakpoint) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return { isMobile };
};

// function sends request to check a refresh token and returns a new access token
export const refreshToken = async () => {
  //avoiding a circular imports:
  const { store } = require("../store/index");

  const authData = store.getState().auth.data;
  try {
    const response = await publicInstance.get("customers/refresh");

    if (response.data) {
      const accessToken = response.data.accessToken;
      store.dispatch(
        setAuth({
          ...authData,
          accessToken,
        }),
      );
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};
