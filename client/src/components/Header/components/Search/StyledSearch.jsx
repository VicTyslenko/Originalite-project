import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

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
		background-color: #fff;
		color: #000;
		margin-top: 2px;
	}
`;
