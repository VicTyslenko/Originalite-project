import { deleteProductFromCart } from "@main/store/actions/cartActions";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addProductToCart, decrementItemInCart } from "../../store/actions/cartActions";
import EmptyCart from "../ShoppingCart/EmptyCart/EmptyCart";
import PaymentModal from "./Modal/Modal";
import {
	Content,
	ContentWrapp,
	LeftSideWrapp,
	RemoveButton,
	RightSideWrapp,
	ShoppingCartWrapp,
	StyledDiv,
	StyledLink,
} from "./StyledShoppingCart";

function ShoppingCart() {
	const dispatch = useDispatch();

	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useSelector(state => state.cart.data);

	const [open, setOpen] = useState(false);

	const priceItem = cart?.map(({ product, cartQuantity }) => product.currentPrice * cartQuantity);

	useEffect(() => {
		setTotalPrice(priceItem.reduce((a, b) => a + b, 0));
	}, [cart]);

	const handleIncrement = id => {
		dispatch(addProductToCart(id));
	};

	const hanleDecrement = id => {
		dispatch(decrementItemInCart(id));
	};

	const handleRemoveItem = id => {
		dispatch(deleteProductFromCart(id));
	};

	const productItem = cart?.map(({ product, color, size, cartQuantity }) => (
		<ContentWrapp key={product._id}>
			<Content>
				<div className="image-wrapp">
					<Link to={`/product/${product.itemNo}`}>
						<img className="image" src={product.imageUrls[0]} alt="" />
					</Link>
				</div>
				<StyledDiv>
					<ul className="list">
						<li className="title">{product.name}</li>
						<li className="color">Color : {color}</li>
						<li className="size">Size : {size}</li>
						<div className="btn-wrapp">
							<button className="btn-qnt" onClick={() => hanleDecrement(product._id)}>
								-
							</button>
							{cartQuantity}
							<button className="btn-qnt" onClick={() => handleIncrement(product._id)}>
								+
							</button>
						</div>

						<li className="price">Price : {product.currentPrice} $ </li>
						<li className="total">Total : {product.currentPrice * cartQuantity} $</li>
					</ul>
					<RemoveButton onClick={() => setOpen(true)}>Remove</RemoveButton>
				</StyledDiv>
			</Content>
			{open && (
				<PaymentModal
					open={open}
					close={() => setOpen(false)}
					text="Do you want to remove this item from your Shopping Bag?"
					actions
					customStyles={{
						width: "600px",
					}}
					confirm={() => handleRemoveItem(product._id)}
					confirmText="Remove item"
					cancelText="No, keep it"
				/>
			)}
		</ContentWrapp>
	));
	return (
		<Container
			maxWidth="lg"
			sx={{
				marginBottom: "50px",
				marginTop: "40px",
			}}
		>
			{cart.length > 0 ? (
				<ShoppingCartWrapp>
					<LeftSideWrapp>{productItem}</LeftSideWrapp>
					<RightSideWrapp>
						<h1 className="title">Shopping bag total</h1>
						<p className="discount">Add a discount code</p>
						<TextField id="standard-basic" variant="standard" />
						<hr className="line" />
						<p className="order">Order value :</p>
						<p className="delivery">Delivery :</p>
						<p className="total">
							Total price: <span className="total-price">{totalPrice} $ </span>{" "}
						</p>
						<div className="button-wrapp">
							<StyledLink to={"/account/profile/address-details"}>Checkout</StyledLink>
						</div>
					</RightSideWrapp>
				</ShoppingCartWrapp>
			) : (
				<EmptyCart />
			)}
		</Container>
	);
}

export default ShoppingCart;
