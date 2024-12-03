import styled from 'styled-components';
import { Button } from '@mui/material';
export const Content = styled.div`
	border-bottom: 1px solid grey;
	margin-bottom: 5rem;
	padding: 0 0 2rem 0;
	
	& .wrapp {
		display: flex;
		justify-content: space-between;
	}
	& .icon-wrapp {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
	}
`;
export const TotalPrice = styled.h2`
	margin: 0;
`;
export const FlexWrapper = styled.div`
	display: flex;
	gap: 5rem;
	& .image {
		height: 20rem;
		width: 16rem;
	}
`;
export const Description = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	& .title {
		font-weight: 700;
		font-size: 24px;
		line-height: 33px;
		font-family: 'Open Sans';
		color: #000000;
		text-transform: uppercase;
	}
	& .price,
	.color {
		color: #847a7a;
		font-weight: 400;
		font-size: 20px;
		line-height: 22px;
		font-family: 'Open Sans';
	}
`;
export const StyledButton = styled(Button)`
	&&& {
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans';
		background: #000000;
		color: white;
		align-self: flex-end;
	}
`;
