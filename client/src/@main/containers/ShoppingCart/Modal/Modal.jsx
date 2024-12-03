import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
	position: 'absolute',
	top: '42%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'black',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const PaymentModal = ({ open, close }) => {
	return (
		<div>
			<Modal open={open} onClose={close}>
				<Box sx={style}>
					<Typography
						id="modal-modal-description"
						sx={{
							marginTop: '50px',
							fontSize: '20px',
							height: '7rem',
							textAlign: 'center',
							color: 'white',
							fontFamily: 'Sofia',
							fontSize: '24px',
						}}
					>
						Thank you for chosing our shop!
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};
export default PaymentModal;
