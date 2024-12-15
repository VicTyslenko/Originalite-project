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
		display: block;
		color: grey;
	}
`;
