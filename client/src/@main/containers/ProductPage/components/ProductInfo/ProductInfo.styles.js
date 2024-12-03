import { Box, List, ListItemButton, ListItemIcon, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ActionsWrapper = styled(Box)`
	display: flex;
	align-items: center;
	column-gap: 10px;
	margin-bottom: 2rem;

	${(props) => props.theme.breakpoints.down('sm')} {
		justify-content: space-between;
		margin-bottom: 1rem;
	}
`;

export const StyledButton = styled(Button)`
	${(props) => props.theme.breakpoints.down('md')} {
		width: 210px;
	}

	${(props) => props.theme.breakpoints.down('sm')} {
		width: 235px;
	}
`;

export const ProductHeader = styled(Box)`
	display: flex;
    align-items: flex-start;
	justify-content: space-between;
	max-width: 390px;
	box-sizing: border-box;
`;

export const ProductInfoHeader = styled(Box)`
	margin-bottom: 3rem;

	${(props) => props.theme.breakpoints.down('md')} {
		margin-bottom: 1.5rem;
	}

	${(props) => props.theme.breakpoints.down('sm')} {
		width: 290px;
		margin: auto;
		margin-bottom: 1.5rem;
	}
`;

export const ListStyled = styled(List)`
	display: flex;
`;

export const ListItemButtonStyled = styled(ListItemButton)`
	max-width: fit-content;
	display: flex;
	flex-direction: column;
	align-items: center;

	&.Mui-selected {
		border-bottom: none;
	}
`;

export const ColorIcon = styled(Box)`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	box-shadow: 0 2px 4px rgba(119, 114, 114, 0.25);
	margin-bottom: 0.5rem;
`;

export const ListItemIconColor = styled(ListItemIcon)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ColorList = styled(Box)`
	margin-bottom: 2.5rem;

	${(props) => props.theme.breakpoints.down('md')} {
		margin-bottom: 0.5rem;
	}

	${(props) => props.theme.breakpoints.down('sm')} {
		margin-bottom: 0;
	}
`;

export const SizeList = styled(Box)`
	margin-bottom: 5rem;

	${(props) => props.theme.breakpoints.down('md')} {
		margin-bottom: 3rem;
	}

	${(props) => props.theme.breakpoints.down('sm')} {
		margin-bottom: 1.5rem;
	}
`;
