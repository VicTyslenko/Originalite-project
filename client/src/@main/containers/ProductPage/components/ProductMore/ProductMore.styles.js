import { Box, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
	column-gap: 2rem;
`;

export const StyledGallery = styled(Box)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	align-items: center;
	gap: 50px;
	margin-bottom: 20px;
`;

export const StyledCardContent = styled(CardContent)`
	height: 80px;
	box-sizing: border-box;
	display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

	${(props) => props.theme.breakpoints.down('md')} {
		height: 104px;
	}
`;

export const StyledTitle = styled(Typography)`
	max-height: 65px;
	text-overflow: ellipsis;
	overflow: hidden;
	color: #000;

	${(props) => props.theme.breakpoints.down('md')} {
		height: 44px;
	}
`;
