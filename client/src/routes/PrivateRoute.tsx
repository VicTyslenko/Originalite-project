import { useUserData } from "hooks/use-user-data";
import { Navigate, Outlet } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

function PrivateRoute() {
  const { isAuth } = useUserData();
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  if (isAuth) {
    return <Outlet />;
  }

  if (isLoggedOut) {
    return <Navigate to="/login-form" replace />;
  }

  // data is null but isLoggedOut is false — refresh token request is in-flight
  return null;
}

export default PrivateRoute;
