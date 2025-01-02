import { Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProduct } from "../../store/actions/productActions";
import { selectProduct } from "../../store/selectors/productSelector";
import BackButton from "./components/BackButton";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductMore from "./components/ProductMore";

function ProductPage() {
	const product = useSelector(state => state.product.data);
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(getProduct(id));
			window.scrollTo(0, 0);
		}
	}, [id]);

	return (
		<Container sx={{ marginTop: "20px", marginBottom: "50px" }} maxWidth="lg">
			<BackButton />
			<Grid container spacing={2} mb={8}>
				<Grid item xs={12} sm={7} md={8}>
					{product && <ProductGallery images={product.imageUrls} />}
				</Grid>
				<Grid item xs={12} sm={5} md={4}>
					{product && (
						<ProductInfo
							id={product._id}
							name={product.name}
							productUrl={product.productUrl}
							currentPrice={product.currentPrice}
							colors={product.colors}
							sizes={product.sizes}
							productDetails={product.productDetails}
							productDelivery={product.productDelivery}
						/>
					)}
				</Grid>
			</Grid>
			<ProductMore />
		</Container>
	);
}

export default ProductPage;
