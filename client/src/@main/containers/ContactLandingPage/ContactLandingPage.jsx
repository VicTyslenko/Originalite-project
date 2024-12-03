import { Container } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import {Wrapper} from './ContactLandingPage.styles'

function ContactLandingPage() {
	return (
		<Container
			maxWidth="lg"
			sx={{
				marginBottom: '50px',
				marginTop: '50px',
			}}
		>
			<Wrapper>
				<LocalPhoneIcon sx={{ marginLeft: '150px', marginRight: '20px' }}/>
				
				<p>+38-(050)-555-55-55</p>
				<EmailIcon sx={{ marginLeft: '150px', marginRight: '20px' }}/>
				<p>originalite@gmail.com</p>
			</Wrapper>
		</Container>
	);
}

export default ContactLandingPage;
