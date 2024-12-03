import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h3`
	text-align: center;
	padding-top: 8px;
	font-size: 22px;
	font-family: 'Josefin Sans';
	text-transform: uppercase;
`;

export const WrappContainer = styled.div`
	width: 350px;
	padding-top: 16px;
`;

export const ButtonShoppingBag = styled(Link)`
	font-size: 15px;
	font-style: normal;
	padding: 14px 30px;
	color: #fafafa;
	background: #160e05;
	border: none;
	border-radius: 16px;
	outline: none;
	cursor: pointer;
	transition: 0.5s;
	letter-spacing: 0.8px;
	text-decoration: none;
	text-transform: uppercase;
	font-family: 'Josefin Sans';

	&:hover {
		background: #434342;
	}
`;

export const MainContent = styled.div`
	position: relative;
`;

export const ContentItem = styled.div`
	width: 100%;
	display: flex;
	position: relative;
	padding-bottom: 16px;
	align-items: center;
	margin-bottom: 16px;
	border-bottom: 1px solid #c4c4c4;
`;

export const ImageWrapp = styled.div`
	height: 80px;
	width: 60px;

	img {
		height: 100%;
	}
`;

export const Description = styled.div`
	display: flex;
	justify-content: center;
	padding-left: 26px;
`;

export const NameItem = styled.h3`
	margin: 0;
	font-size: 16px;
	font-family: 'Open Sans';
	text-transform: uppercase;
`;

export const Price = styled.p`
	display: inline-block;
	padding-top: 6px;
	font-size: 16px;

	& .price {
		font-size: 15px;
		font-weight: 550;
	}
`;

export const CloseItemIcon = styled.div`
	cursor: pointer;
	position: absolute;
	bottom: 6px;
	right: 15px;
`;

export const FooterContent = styled.div`
	position: relative;
	top: 30px;
	margin-bottom: 60px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	width: 300px;
`;

export const TotalPrice = styled.div`
	font-size: 20px;
	font-weight: 600;
	text-transform: uppercase;
	font-family: 'Josefin Sans';
`;
