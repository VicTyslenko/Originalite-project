import CloseIcon from "@mui/icons-material/Close";
import { Container, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EmptyCart from "../../../../@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import { deleteProductFromCart } from "../../../../@main/store/actions/cartActions";
import { cartDataSelect } from "../../../../@main/store/selectors/cartSelector";
import {
	ButtonShoppingBag,
	CloseItemIcon,
	ContentItem,
	Description,
	FooterContent,
	ImageWrapp,
	MainContent,
	NameItem,
	Price,
	Title,
	TotalPrice,
	WrappContainer,
} from "./StyledShoppingBag";

function ShoppingBag({ isShoppingBag, closeShoppingBag }) {
	const dispatch = useDispatch();

	const [totalPrice, setTotalPrice] = useState(0);

	const dataProducts = useSelector(cartDataSelect);

	const productItem = dataProducts?.map(
		({ product }) =>
			product && (
				<ContentItem key={product._id}>
					<Link to={`product/${product.itemNo}`}>
						<ImageWrapp className="image-wrapp">
							<img className="image" src={product.imageUrls[0]} alt="" />
						</ImageWrapp>
					</Link>
					<Description className="list">
						<div className="description">
							<NameItem>{product.name}</NameItem>
							<Price>
								Price : <span className="price">{product.currentPrice} $</span>
							</Price>
						</div>
						<CloseItemIcon
							onClick={e => {
								dispatch(deleteProductFromCart(product._id));
							}}
						>
							<CloseIcon />
						</CloseItemIcon>
					</Description>
				</ContentItem>
			),
	);

	const priceItem = dataProducts.map(({ product, cartQuantity }) => product && product.currentPrice * cartQuantity);

	useEffect(() => {
		setTotalPrice(priceItem.reduce((accum, item) => accum + item, 0));
	}, [dataProducts]);

	return (
		<>
			<Drawer anchor="right" open={isShoppingBag} onClose={() => closeShoppingBag()}>
				<Container>
					<Title>Shopping Bag</Title>
					<WrappContainer>
						{dataProducts.length > 0 ? (
							<MainContent>
								{productItem}

								<FooterContent>
									<TotalPrice>
										<span>Total : {totalPrice} $</span>
									</TotalPrice>
									<ButtonShoppingBag onClick={() => closeShoppingBag()} to="/shopping-cart">
										Basket
									</ButtonShoppingBag>
								</FooterContent>
							</MainContent>
						) : (
							<EmptyCart />
						)}
					</WrappContainer>
				</Container>
			</Drawer>
		</>
	);
}
export default ShoppingBag;
