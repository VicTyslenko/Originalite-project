import { Box, Typography, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProductHeader = styled(Box)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: 390px;
`;

export const StyledTitle = styled(Typography)`
	max-height: 65px;
	text-overflow: ellipsis;
	overflow: hidden;

	${(props) => props.theme.breakpoints.down('md')} {
		height: 44px;
	}
	${(props) => props.theme.breakpoints.down('sm')} {
		height: 32px;
	}
`;

export const StyledCardContent = styled(CardContent)`
	height: 125px;
	box-sizing: border-box;
	display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

	${(props) => props.theme.breakpoints.down('md')} {
		height: 104px;
	}
	${(props) => props.theme.breakpoints.down('sm')} {
		height: 73px;
	}
`;
