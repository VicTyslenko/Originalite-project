import { Container, Grid } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { getProduct } from "../../store/actions/productActions";
import BackButton from "./components/BackButton";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import ProductMore from "./components/ProductMore";

function ProductPage() {
	const product = useStoreSelector(state => state.product.data);

	const dispatch = useStoreDispatch();

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
