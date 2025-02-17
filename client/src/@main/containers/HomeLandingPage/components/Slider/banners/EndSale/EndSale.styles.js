import styled from "styled-components";

export const StyledText = styled.h1`
	text-transform: uppercase;
	font-weight: 700;
	margin-bottom: 28px;
	font-size: 38px;
	color: #e01515;
`;

export const StyledDiv = styled.div`
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
	font-family: "Josefin Sans", sans-serif;
	width: 272px;
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	top: 5%;
	left: 74%;
	color: #fff;
`;
