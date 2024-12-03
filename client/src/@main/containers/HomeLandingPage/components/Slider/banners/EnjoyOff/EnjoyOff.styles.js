import styled from 'styled-components';

export const StyledText = styled.h1`
	text-transform: uppercase;
	font-weight: 700;
	margin-bottom: 28px;
	font-size: 38px;
	color: #e01515;
`;

export const StyledDiv = styled.div`
	color: #3f3d3d;
	font-size: 30px;
	font-weight: 300;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
	> span {
		text-decoration: underline;
	}
`;

export const StyledWrapper = styled.div`
	font-family: 'Josefin Sans', sans-serif;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top: 49%;
	left: 7%;
	color: #fff;
`;
