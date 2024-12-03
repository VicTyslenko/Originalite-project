import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const Categories = styled.h3`
	color: white;
	font-weight: 600;
	font-size: 20px;
	line-height: 27px;
	font-family: 'Open Sans', sans-serif;
	margin-bottom: 50px;
	text-transform: uppercase;
`;

export const StyledLink = styled(Link)`
	&&& {
		margin-bottom: 40px;
		color: white;
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans', sans-serif;
		display: block;
		cursor: pointer;
		text-decoration: none;
		text-transform: capitalize;
	}
`;
