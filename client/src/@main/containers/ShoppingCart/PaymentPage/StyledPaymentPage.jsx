import styled from 'styled-components';
import { Button } from '@mui/material';
export const PaymentWrapper = styled.div`
	width: 600px;
	background: #ebebeb;
	padding: 30px 0 50px 60px;
	margin: 50px 0 50px 0;
	& .total-payment {
		font-size: 20px;
		line-height: 16px;
		margin-bottom: 50px;
	}
	& .flex-block {
		display: flex;
		align-items: end;
		gap: 15px;
		margin-bottom: 30px;
	}
	& .flex-select {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 30px;
	}
	& .cvv {
		display: flex;
		align-items: end;
		font-size: 12px;
		gap: 15px;
	}
`;

export const Title = styled.h1`
	margin-top: 20px;
	margin-bottom: 80px;
	font-weight: bold;
	font-size: 16px;
	line-height: 16px;
	font-family: 'Josefin Sans';
	text-transform: uppercase;
`;

export const StyledButton = styled(Button)`
	&&& {
		background-color: black;
		color: white;
		margin-top:50px;
	}
`;
export const CardsWrapper = styled.div`
	display: flex;
	gap: 30px;
	margin-bottom:20px ;
`;
