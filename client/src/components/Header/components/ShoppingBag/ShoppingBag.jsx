import { closeModal } from "@main/store/slices/modal/modalSlice";
import { Container, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import EmptyCart from "../../../../@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import * as S from "./StyledShoppingBag";
import { ShoppingBagItem } from "./extensions/ShoppingBagItem";

function ShoppingBag({ isShoppingBag }) {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [totalPrice, setTotalPrice] = useState(0);

	const dataProducts = useSelector(state => state.cart.data);

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
						height: "100%",
					}}
				>
					<S.Title>Shopping Bag</S.Title>
					<S.WrappContainer>
						{dataProducts.length > 0 ? (
							<>
								<S.MainContent>
									<ShoppingBagItem products={dataProducts} />
								</S.MainContent>

								<S.FooterContent>
									<S.TotalPrice>
										<span>Total : {totalPrice} $</span>
									</S.TotalPrice>
									<S.ButtonShoppingBag
										onClick={e => {
											e.target.blur();
											dispatch(closeModal());
											navigate("/shopping-cart");
										}}
									>
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
