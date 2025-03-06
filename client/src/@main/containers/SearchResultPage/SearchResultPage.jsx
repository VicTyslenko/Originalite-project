import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import ProductCard from "../ProductList/components/ProductCard/ProductCard";
import { StyledGrid } from "./SearchResultPage.styles";

function SearchResultPage() {
	const products = useStoreSelector(state => state.productList.products);
	const { searchId } = useParams();
	const filteredProducts = products.filter(product => {
		return product.name.toLowerCase().includes(searchId);
	});

	console.log(products);
	return (
		<Container maxWidth="lg">
			<StyledGrid>
				{filteredProducts &&
					filteredProducts.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
						<ProductCard key={_id} title={name} price={currentPrice} url={imageUrls[0]} alt={name} id={itemNo} />
					))}
			</StyledGrid>
		</Container>
	);
}

export default SearchResultPage;
