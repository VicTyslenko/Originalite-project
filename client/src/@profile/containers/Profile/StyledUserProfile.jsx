import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FlexWrapp = styled.div`
	display: flex;
	align-items: center;
	gap: 48px;
padding:55px 0 50px 40px ;
`;
export const StyledLink = styled(Link)`
	&&& {
		display: block;
		width: 100%;
		height: fit-content;
		background-color: black;
		text-decoration: none;
		color: white;
	}

	& .title {
		font-weight: 700;
		font-size: 24px;
		line-height: 24px;
		font-family: 'Josefin Sans', sans-serif;
	}
	& .description {
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans', sans-serif;
	}
`;
