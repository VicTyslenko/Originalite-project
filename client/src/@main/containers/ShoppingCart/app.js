import {lazy} from 'react'

const ShoppingCart = lazy(() => import(

	/* webpackChunkName: "ShoppingCart/app" */
	"./ShoppingCart"
	));


export default function () {
	return (
		<ShoppingCart />
	);
};
