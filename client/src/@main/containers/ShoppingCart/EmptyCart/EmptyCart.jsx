import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Container } from '@mui/system';
import { Description } from './StyledEmptyCart';
const StyledEmptyCart = () => {
	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: '40px',
				margin: '100px 0 100px 0',
			}}
		>
			<ShoppingCartOutlinedIcon
				sx={{
					height: '150px',
					width: '200px',
				}}
			/>
			<Description>Your shopping cart is empty</Description>
		</Container>
	);
};

export default StyledEmptyCart;
