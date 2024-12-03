import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContainerWrapper = styled.div`
	background-color: #000;
	padding-bottom: 115px;
	padding-top: 110px;
`;

export const CategoryH1 = styled.h1`
	font-weight: 400;
	font-size: 24px;
	color: #fff;
	margin-bottom: 35px;
	margin-left: 70px;
`;

export const CategoryLink = styled(Link)`
	/* display: block; */
`;
export const ImageText = styled.p`
	display: block;
	position: absolute;
	bottom: 0;
	left: 0;

	padding: 10px 60px 10px 60px;
	margin: 0;
	box-sizing: border-box;
	font-weight: 700;
	font-size: 24px;
	line-height: 1.2;
	text-transform: uppercase;
	color: #ffffff;
	background-color: rgba(18, 18, 18, 0.7);
`;
export const FlexContainer = styled.div`
	display: flex;
	gap: 24px;
`;
export const GridItem = styled.div`
	position: relative;
w
	img {
		width: 100%;
	}
`;

export const ImageWrap = styled.div`
	margin-top: 74px;
	img {
		width: 100%;
	}
`;
