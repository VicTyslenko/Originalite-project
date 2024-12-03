import React from 'react';
import { Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

import { StyledCardContent, StyledTitle } from "./ProductMore.styles";
import { useNavigate } from 'react-router-dom';

function ProductMoreCard({ url, title, price, id, itemNo }) {
	const navigate = useNavigate();

	const handlerOpenCard = () => {
		navigate(`/product/${itemNo}`);
	};

	return (
		<Card sx={{ maxWidth: 277 }}>
			<CardActionArea onClick={handlerOpenCard}>
				<CardMedia component="img" image={url} id={id} />
				<StyledCardContent>
					<StyledTitle gutterBottom variant="body1" component="div">
						{title}
					</StyledTitle>
					<Typography variant="body2" color="text.secondary">
						{price} $
					</Typography>
				</StyledCardContent>
			</CardActionArea>
		</Card>
	);
};

ProductMoreCard.propTypes = {
	title: PropTypes.string,
	price: PropTypes.number,
	url: PropTypes.string,
	id: PropTypes.string,
};

export default ProductMoreCard;
