import styled from "styled-components";

export const Title = styled.h1`
	font-weight: 700;
	font-size: 36px;
	line-height: 36px;
	font-family: "Josefin Sans";
	color: #000000;
	margin-bottom: 50px;
`;

export const InnerWrapper = styled.div`
	& .MuiTabs-flexContainer {
		justify-content: space-between;
		font-weight: 400;
		font-size: 24px;
		line-height: 33px;
		font-family: "Open Sans";
	}

	& .MuiTab-root {
		color: #828080;
		font-weight: 400;
		font-size: 24px;
		line-height: 33px;
		font-family: "Open Sans";
	}
`;
