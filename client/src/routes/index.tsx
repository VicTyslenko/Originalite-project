import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAutoLogin } from "shared/hooks/use-auto-login";

const Main = React.lazy(() => import("../@main/main"));

const Profile = React.lazy(() => import("../@profile/profile"));
const Editor = React.lazy(() => import("../@editor/app"));

function AppRoutes() {
  useAutoLogin();

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <React.Suspense fallback={"...Loading"}>
            <Main />
          </React.Suspense>
        }
      />
      <Route
        path="/account/*"
        element={
          <React.Suspense fallback="...Loading">
            <Profile />
          </React.Suspense>
        }
      />
      <Route
        path="/editor/*"
        element={
          <React.Suspense fallback="...Loading">
            <Editor />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
