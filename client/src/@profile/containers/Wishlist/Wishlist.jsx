import CloseIcon from "@mui/icons-material/Close";
import { Container, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductToCart } from "../../../@main/store/actions/cartActions";
import { deleteProductFromWishlist } from "../../../@main/store/actions/wishlistActions";
import { Content, Description, FlexWrapper, StyledButton } from "./StyledWishList";

function Wishlist() {
	const dispatch = useDispatch();

	const [totalPrice, setTotalPrice] = useState(0);

	const data = useSelector(state => state.wishlist.data);

	const MainContent = data.map(({ name, currentPrice, imageUrls, colors, sizes, _id: _id }) => (
		<Content key={_id}>
			<div className="wrapp">
				<FlexWrapper>
					<div className="image-wrapp">
						<img src={imageUrls[0]} alt={name} className="image" />
					</div>
					<Description>
						<h1 className="title">{name}</h1>
						<p className="price"> Price :{currentPrice} $</p>
						<p className="color">Color : {colors[0].color}</p>
						<p className="size">Size : {sizes[0]}</p>
					</Description>
				</FlexWrapper>
				<div className="icon-wrapp">
					<CloseIcon
						onClick={() => {
							dispatch(deleteProductFromWishlist(_id));
						}}
						sx={{
							cursor: "pointer",
						}}
					/>
					<StyledButton
						onClick={() => {
							dispatch(addProductToCart(_id));
						}}
					>
						Add to cart
					</StyledButton>
				</div>
			</div>
		</Content>
	));
	const allPrices = data.map(product => product.currentPrice);

	useEffect(() => {
		setTotalPrice(allPrices.reduce((a, b) => a + b, 0));
	}, [data]);
	return (
		<Container
			maxWidth="lg"
			sx={{
				marginTop: "50px",
				marginBottom: "50px",
			}}
		>
			{data.length > 0 ? (
				<Fragment>
					{MainContent}
					<h2 className="total-price">Total price : {totalPrice}</h2>
				</Fragment>
			) : (
				<Typography variant="h4" sx={{ mb: "141px", color: "black", display: "flex", justifyContent: "center" }}>
					Your wishlist is empty
				</Typography>
			)}
		</Container>
	);
}

export default Wishlist;
