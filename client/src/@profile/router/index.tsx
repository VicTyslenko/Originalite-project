import { Route, Routes } from "react-router-dom";

import MyAccount from "../MyAccount/MyAccount";
import Profile from "../containers/Profile";

function ProfileRoutes() {
  return (
    <Routes>
      <Route path="my-account" element={<MyAccount />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

export default ProfileRoutes;
