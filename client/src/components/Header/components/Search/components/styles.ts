import { Link } from "react-router-dom";
import styled from "styled-components";

export const SearchWrapper = styled.div``;

export const ItemWrapp = styled.div`
	padding: 14px 0;
	border-bottom: 1px solid #dfdbdb;
`;

export const StyledLink = styled(Link)`
	&&& {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 30px;
	}
`;
export const SearchedItem = styled.h1`
	color: black;
	font-size: 18px;
	font-weight: 500;
	margin: 0;
`;

export const Categories = styled.p`
	color: grey;
	font-size: 16px;
	margin: 0;
`;
