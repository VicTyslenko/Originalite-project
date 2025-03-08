import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import ProductCard from "../ProductList/components/ProductCard/ProductCard";
import { StyledGrid } from "./SearchResultPage.styles";

function SearchResultPage() {
  const products = useStoreSelector(state => state.productList.products);

  const { searchId } = useParams();

  const filteredProducts = products.filter(product => {

    return searchId ? product.name.toLowerCase().includes(searchId) : product;
  });

  return (
    <Container maxWidth="lg">
      <StyledGrid>
        {filteredProducts &&
          filteredProducts.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
            <ProductCard key={_id} name={name} currentPrice={currentPrice} url={imageUrls[0]} alt={name} _id={itemNo} />
          ))}
      </StyledGrid>
    </Container>
  );
}

export default SearchResultPage;
