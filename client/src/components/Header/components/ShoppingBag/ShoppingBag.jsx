import { closeModal } from "@main/store/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EmptyCart from "../../../../@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import { deleteProductFromCart } from "../../../../@main/store/actions/cartActions";
import * as S from "./StyledShoppingBag";

function ShoppingBag({ isShoppingBag }) {
	const dispatch = useDispatch();

	const [totalPrice, setTotalPrice] = useState(0);
	const dataProducts = useSelector(state => state.cart.data);

	const productItem = dataProducts?.map(
		({ product }) =>
			product && (
				<S.ContentItem key={product._id}>
					<Link to={`product/${product.itemNo}`}>
						<S.ImageWrapp className="image-wrapp">
							<img className="image" src={product.imageUrls[0]} alt="" />
						</S.ImageWrapp>
					</Link>
					<S.Description className="list">
						<div className="description">
							<S.NameItem>{product.name}</S.NameItem>
							<S.Price>
								Price : <span className="price">{product.currentPrice} $</span>
							</S.Price>
						</div>
						<S.CloseItemIcon
							onClick={e => {
								dispatch(deleteProductFromCart(product._id));
							}}
						>
							<CloseIcon />
						</S.CloseItemIcon>
					</S.Description>
				</S.ContentItem>
			),
	);

	const priceItem = dataProducts.map(({ product, cartQuantity }) => product && product.currentPrice * cartQuantity);

	useEffect(() => {
		setTotalPrice(priceItem.reduce((accum, item) => accum + item, 0));
	}, [dataProducts]);

	return (
		<>
			<Drawer
				anchor="right"
				open={isShoppingBag}
				onClose={() => {
					dispatch(closeModal());
				}}
			>
				<Container
					onClick={e => e.stopPropagation()}
					style={{
						overflow: "hidden",
					}}
				>
					<S.Title>Shopping Bag</S.Title>
					<S.WrappContainer>
						{dataProducts.length > 0 ? (
							<>
								<S.MainContent>{productItem}</S.MainContent>

								<S.FooterContent>
									<S.TotalPrice>
										<span>Total : {totalPrice} $</span>
									</S.TotalPrice>
									<S.ButtonShoppingBag onClick={() => dispatch(closeModal())} to="/shopping-cart">
										Basket
									</S.ButtonShoppingBag>
								</S.FooterContent>
							</>
						) : (
							<EmptyCart />
						)}
					</S.WrappContainer>
				</Container>
			</Drawer>
		</>
	);
}
export default ShoppingBag;
