import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getProductList } from "../../store/actions/productListActions";
import Categories from "./components/Categories";
import NewInSection from "./components/NewCollection";
import Slider from "./components/Slider";

function HomeLandingPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductList());
		window.scrollTo(0, 0);
	}, [dispatch]);

	return (
		<>
			<Slider />
			<NewInSection />
			<Categories />
		</>
	);
}

export default HomeLandingPage;
