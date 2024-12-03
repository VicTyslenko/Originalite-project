import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProductList } from '../../store/selectors/productListSelectors';
import ProductCard from '../ProductList/components/ProductCard';
import { StyledGrid } from './SearchResultPage.styles';

function SearchResultPage() {
  const products =  useSelector(selectProductList)
const { searchId } = useParams()
const filteredProducts = products.filter(product => { 
	return product.name.toLowerCase().includes(searchId)
})

console.log(products);
	return (
		<Container maxWidth='lg'>
			<StyledGrid>
			{filteredProducts && filteredProducts.map(({ name, currentPrice, imageUrls, _id, itemNo }) => (
								<ProductCard
									key={_id}
									title={name}
									price={currentPrice}
									url={imageUrls[0]}
									alt={name}
									id={itemNo} />
							))}
							</StyledGrid>
		</Container>
	)
}

export default SearchResultPage;
