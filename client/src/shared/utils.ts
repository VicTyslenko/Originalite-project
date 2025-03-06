import { type Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export const LocalStorage = {
  deleteAuthToken: () => localStorage.removeItem("persist:auth"),
  deleteTempAuthToken: () => sessionStorage.removeItem("persist:tempAuth"),
};

export const useGetMobileSize = (size: number | Breakpoint) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(size));

  return { isMobile };
};
