import { styled } from "@mui/material/styles";

import { Box, CardContent } from "@mui/material";

export const ProductHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 390px;
`;

export const StyledCardContent = styled(CardContent)`
  height: 125px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  ${props => props.theme.breakpoints.down("md")} {
    height: 104px;
  }
  ${props => props.theme.breakpoints.down("sm")} {
    height: 73px;
  }
`;
