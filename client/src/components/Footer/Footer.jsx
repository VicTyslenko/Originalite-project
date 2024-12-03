import {
	Container,
	Grid,
	useMediaQuery,
} from '@mui/material';
import { StyledText, StyledLink, ContainerWrapper, LinkContainer, ContentWrapp } from './Footer.styles';

function Footer() {
	const matches = useMediaQuery('(min-width:969px)');

	return (
		<ContainerWrapper>
			<Container maxWidth="lg">
				<Grid container spacing={2} sx={{ justifyContent: 'space-between', padding: '0px 137px' }}>
					<ContentWrapp>
						<StyledText>HELP</StyledText>
						<LinkContainer>
							<StyledLink to="/questions">Frequently asked questions</StyledLink>
							<StyledLink to="/contact">Contact</StyledLink>
							<StyledLink to="/payment">Payment</StyledLink>
						</LinkContainer>
					</ContentWrapp>
					<ContentWrapp>
						<StyledText>FOLLOW US</StyledText>
						<LinkContainer>
							<StyledLink to="/">Facebook</StyledLink>
							<StyledLink to="/">Instagram</StyledLink>
							<StyledLink to="/">Pinterest</StyledLink>
						</LinkContainer>
					</ContentWrapp>
					<ContentWrapp>
						<StyledText>COMPANY</StyledText>
						<LinkContainer>
							<StyledLink to="/history-brand">History of the brand</StyledLink>
							<StyledLink to="/policy">Policy</StyledLink>
							<StyledLink to="/work-us">Work with Us</StyledLink>
						</LinkContainer>
					</ContentWrapp>
				</Grid>
			</Container>
		</ContainerWrapper>
	);
}

export default Footer;
