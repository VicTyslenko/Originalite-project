import { Container } from '@mui/material';
import NoContentPage from '../NoContentPage/NoContentPage';
function QuestionsLandingPage() {
	return (
		<Container maxWidth='lg'sx={{
			marginBottom:'50px'
		}}>
		<NoContentPage />
		</Container>
	)
}

export default QuestionsLandingPage;
