import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


export const ContainerWrapper = styled('div')`
background-color: #000;
 padding-bottom: 122px;
  padding-top: 115px;
`

export const ContentWrapp = styled('div')`
margin-bottom: 20px
`

export const LinkContainer = styled('div')`
display: flex;
 flex-direction: column;
  row-gap: 19px
`

export const StyledText = styled(Typography)`
font-size: 24px;
 margin-bottom: 39px;
  color: #fff;
`

export const StyledLink = styled(Link)`
color: #fff;
text-decoration: none;
`