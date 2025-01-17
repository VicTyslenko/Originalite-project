import { lazy } from "react";

const HomeLandingPage = lazy(() => import("./HomeLandingPage"));

export default function () {
	return <HomeLandingPage />;
}
