import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarWrapp = styled.div`
	background-color: black;
	display: flex;
	flex-direction: column;

	padding-top: 40px;
	padding-bottom: 60px;
	width: 350px;
`;

export const ButtonWrap = styled.div`
	padding: 20px 40px;
	display: flex;
	justify-content: left;
	align-items: center;
	box-sizing: border-box;
`;

export const StyledLink = styled(Link)`
	&&& {
		font-weight: 400;
		font-size: 18px;
		line-height: 20px;
		font-family: 'Open Sans';
		color: #ffffff;
		text-decoration: none;
		text-transform: uppercase;
	}
`;
