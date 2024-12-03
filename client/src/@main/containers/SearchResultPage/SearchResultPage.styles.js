import { styled } from "@mui/material";
import {Box} from "@mui/material";

export const StyledGrid = styled(Box)`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: center;
	row-gap: 4rem;
	margin-bottom: 16px;
`;