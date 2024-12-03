import styled from 'styled-components';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)`
	&&& {
		background-color: black;
		font-family: 'Open Sans', sans-serif;
		font-style: normal;
		color:white ;
		 font-weight: 400;

	}
`;
const MainWrapp = styled.div`
	display: grid;
	margin-top: 70px;
	grid-template-columns: 1fr 1fr;

	& p {
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		text-transform: uppercase;
	}
	& h3 {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin-top: 12rem;
	}
	& div {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 352px;
	}

	& .billing {
		border-left: 1px solid #c4c4c4;
		padding-left: 70px;
	}
	& .billing p {
		margin-top: 15rem;
	}
`;

export default MainWrapp;
