import styled from 'styled-components';

export const StyledText = styled.h1`
	text-transform: uppercase;
	font-weight: 700;
	margin-bottom: 28px;
	font-size: 38px;
	color: #E01515;
`;

export const StyledDiv = styled.div`
	color: #3F3D3D;
	font-size: 30px;
	font-weight: 300;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
	>span {
		text-decoration: underline;
	}
`;

export const StyledWrapper = styled.div`
	font-family: 'Josefin Sans', sans-serif;
	width: 272px;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	top: 39.5%;
	left: 57%;
	color: #fff;
`;
