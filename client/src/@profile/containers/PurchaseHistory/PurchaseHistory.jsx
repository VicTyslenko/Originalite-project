import { Container,Typography } from '@mui/material';

function PurchaseHistory() {

	return (
		<Container maxWidth='lg'sx={{
			marginTop:'50px',
			marginBottom:'50px',
			display:'flex',
			justifyContent:'center'
		}}>
			<Typography variant="h4" sx={{ mb: '141px' }}>No purchase were found </Typography>
		</Container>
	)
}

export default PurchaseHistory
