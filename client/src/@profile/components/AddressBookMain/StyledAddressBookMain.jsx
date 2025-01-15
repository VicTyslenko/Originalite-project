import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)`
	&&& {
		background-color: black;
		font-family: "Open Sans", sans-serif;
		font-style: normal;
		color: white;
		font-weight: 400;
	}
`;

export const MainWrapp = styled.div`
	display: grid;
	margin-top: 70px;
	grid-template-columns: 1fr 1fr;

	& p {
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		text-transform: uppercase;
	}
	& h3 {
		margin: 10px 0;
	}
	& div {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 352px;
	}
`;

export const DeliveryWrapp = styled.div``;

export const BillingWrapp = styled.div`
	border-left: 1px solid #c4c4c4;
	padding-left: 70px;
`;

export const Details = styled.div`
	margin-bottom: 20px;
`;
