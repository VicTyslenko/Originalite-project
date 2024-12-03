import { Box, ListItemIcon, Divider, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)`
	max-width: 300px;
	width: 100%;
	box-sizing: border-box;
	padding: 30px 20px 30px 40px;
	background: #000;
	color: #fff;

	${(props) => props.theme.breakpoints.down('lg')} {
		max-width: 250px;
		padding: 30px 10px 30px 20px;
	}

	${(props) => props.theme.breakpoints.down('md')} {
		max-width: 180px;
		padding: 30px 10px 30px 20px;
	}
`;

export const ListItemIconColor = styled(ListItemIcon)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ColorIcon = styled(Box)`
	width: 21px;
	height: 21px;
	border-radius: 50%;
	box-shadow: 0 2px 4px rgba(119, 114, 114, 0.25);
	margin-bottom: 0.5rem;
`;

export const DividerStyled = styled(Divider)`
	width: 58px;
	border-bottom: 1px solid #fff;
	margin-left: 32px;
`;

export const StyledBoxTypography = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 19px;
	position: relative;
`;

export const StyledTypography = styled(Typography)`
	text-transform: capitalize;
	font-weight: 400;
	font-size: 14px;
	line-height: 14px;
	cursor: pointer;
`;

export const StyledCrossIcon = styled(CloseIcon)`
	cursor: pointer;
	color: #000;
	position: absolute;
	top: 15px;
	right: 15px;
	z-index: 2;
`;

export const FiltersButton = styled(Button)`
	text-transform: capitalize;
	cursor: pointer;
	color: black;
    width: 100%;

	&:hover {
		background-color: rgba(86, 82, 84, 0.04);
	}
`;

export const StyledFilterPriceBox = styled(Box)`
	width: 260px;
	padding-left: 0;

	${(props) => props.theme.breakpoints.down('lg')} {
		width: 230px;
	}
	${(props) => props.theme.breakpoints.down('md')} {
		width: 160px;
	}
	${(props) => props.theme.breakpoints.down('sm')} {
		width: 260px;
	}
`;

export const MobileFilterPriceBox = styled(Box)`
	padding: 8px 32px;
`;

export const FlexBox = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	cursor: pointer;
`;
