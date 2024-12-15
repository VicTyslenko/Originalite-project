import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import AnimateHeight from "react-animate-height";
import styled from "styled-components";

export const PaperStyles = styled(Paper)`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	width: 100%;
	z-index: 3;

	&&& {
		border-radius: 0;
	}
`;
export const SearchWrappAnimate = styled(AnimateHeight)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonSearch = styled(IconButton)`
	&&& {
		position: absolute;
		top: 126px;
		right: 26px;
		background-color: #fff;
		color: #000;
		padding: 0;
		height: 0;
		width: 0;
	}
`;

export const TextFieldWrapp = styled.div`
	position: relative;
	min-width: 500px;
	padding: 100px 0;
`;
