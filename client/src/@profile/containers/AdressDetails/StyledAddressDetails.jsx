import styled from 'styled-components';
import { Link } from '@mui/material';

export const StyledLink = styled(Link)`
	&&& {
		background-color: black;
		color: white;
		width: 260px;
		margin-top: 3rem;
		padding: 1rem 0 1rem 0;
		cursor: pointer;

		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans';
	}
`;
export const Title = styled.h1`
	margin: 0 0 40px 0;
	font-size: 12px;
	text-align: center;
	text-transform: uppercase;
`;

export const ContentForm = styled.div`
	max-width: 500px;
	margin-top: 5rem;
	margin-bottom: 5rem;
	& .button-wrapp {
		display: flex;
		justify-content: center;
	}
`;
