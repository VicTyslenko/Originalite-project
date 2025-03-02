import { lazy } from "react";

const HomeLandingPage = lazy(() => import("./HomeLandingPage"));

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return <HomeLandingPage />;
}
