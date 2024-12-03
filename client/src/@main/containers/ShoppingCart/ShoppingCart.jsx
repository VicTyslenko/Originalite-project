import { React, useState, useEffect, useCallback } from 'react';
import { Container } from '@mui/system';

import { useUserData } from '../../../@profile/hooks/useUserData';
import { cartDataSelect } from '../../store/selectors/cartSelector';
import { Link } from 'react-router-dom';
import { addProductToCart, deleteProductFromCart } from '../../store/actions/cartActions';
import EmptyCart from '../ShoppingCart/EmptyCart/EmptyCart';
import {
	ShoppingCartWrapp,
	RemoveButton,
	StyledLink,
	LeftSideWrapp,
	Content,
	RightSideWrapp,
	ContentWrapp,
	StyledDiv,
} from './StyledShoppingCart';

import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

function ShoppingCart() {
	const dispatch = useDispatch();
	const user = useUserData();
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useSelector(cartDataSelect);

	const priceItem = cart?.map(({ product, cartQuantity }) => product.currentPrice * cartQuantity);

	useEffect(() => {
		setTotalPrice(priceItem.reduce((a, b) => a + b, 0));
	}, [cart]);

	const handleClickIncremet = useCallback(
		(value) => {
			dispatch(addProductToCart(value._id));
		},
		[dispatch],
	);

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
							<button className="btn-qnt">-</button>
							{cartQuantity}
							<button className="btn-qnt" onClick={() => handleClickIncremet(product)}>
								+
							</button>
						</div>

						<li className="price">Price : {product.currentPrice} $ </li>
						<li className="total">Total : {product.currentPrice * cartQuantity} $</li>
					</ul>
					<RemoveButton onClick={() => dispatch(deleteProductFromCart(product._id))}>Remove</RemoveButton>
				</StyledDiv>
			</Content>
		</ContentWrapp>
	));
	return (
		<Container
			maxWidth="lg"
			sx={{
				marginBottom: '50px',
				marginTop: '40px',
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
							Total price: <span className="total-price">{totalPrice} $ </span>{' '}
						</p>
						<div className="button-wrapp">
							<StyledLink to={'/account/profile/address-details'}>Checkout</StyledLink>
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
