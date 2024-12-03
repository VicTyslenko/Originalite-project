import {lazy} from 'react'

const HomeLandingPage = lazy(() => import(

	/* webpackChunkName: "ShoppingCart/app" */
	"./HomeLandingPage"
	));


export default function() {
	return (
		<HomeLandingPage />
	);
};
