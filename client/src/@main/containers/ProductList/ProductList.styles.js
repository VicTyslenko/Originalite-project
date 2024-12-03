import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
	display: flex;
	flex-direction: row;
	justify-content: stretch;
	gap: 2rem;

	${(props) => props.theme.breakpoints.down('sm')} {
		flex-direction: column;
		gap: 1rem;
	}
`;

export const StyledBox = styled(Box)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: center;
	column-gap: 3rem;
	row-gap: 4rem;
	margin-bottom: 16px;

	${(props) => props.theme.breakpoints.down('sm')} {
		justify-items: center;
		column-gap: 1.5rem;
		row-gap: 2rem;
	}
`;

export const StyledTitle = styled(Typography)`
	margin-top: 1rem;
	margin-bottom: 1rem;
	text-transform: capitalize;

	${(props) => props.theme.breakpoints.down('sm')} {
		display: none;
	}
`;
