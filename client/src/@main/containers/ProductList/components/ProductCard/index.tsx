import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { StyledCardContent, StyledTitle } from "./ProductCard.styles";

function ProductCard({ url, alt, title, price, id }) {
	const navigate = useNavigate();

	const handlerOpenCard = () => {
		navigate(`/product/${id}`);
	};

	return (
		<Card sx={{ maxWidth: 370 }}>
			<CardActionArea onClick={handlerOpenCard}>
				<CardMedia component="img" image={url} alt={alt} id={id} />
				<StyledCardContent>
					<StyledTitle gutterBottom variant="title" component="div">
						{title}
					</StyledTitle>
					<Typography variant="body2" color="text.secondary">
						{price} $
					</Typography>
				</StyledCardContent>
			</CardActionArea>
		</Card>
	);
}

export default ProductCard;
