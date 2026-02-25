import { useUserData } from "hooks/use-user-data";
import { Navigate, Outlet } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

function AdminRoute() {
  const { user, isAuth } = useUserData();
  const isLoggedOut = useStoreSelector(state => state.auth.isLoggedOut);

  if (!isAuth) {
    if (isLoggedOut) {
      return <Navigate to="/login-form" replace />;
    }
    // refresh token request is in-flight
    return null;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
