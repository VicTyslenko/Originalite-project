import { deleteProductFromCart } from "@main/store/actions/cartActions";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import { ActionButtons } from "./components";

const style = {
	position: "absolute",
	top: "42%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "black",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const PaymentModal = ({ open, close, text, actions, customStyles, product }) => {
	const dispatch = useDispatch();

	const handleConfirm = id => {
		dispatch(deleteProductFromCart(id));
	};

	return (
		<div>
			<Modal open={open} onClose={close}>
				<Box sx={{ ...style, ...customStyles }}>
					<Typography
						id="modal-modal-description"
						sx={{
							marginTop: "50px",
							fontSize: "20px",
							height: "7rem",
							textAlign: "center",
							color: "white",
							fontFamily: "Sofia",
						}}
					>
						{text}
					</Typography>
					{actions && <ActionButtons confirm={() => handleConfirm(product._id)} cancel={close} />}
				</Box>
			</Modal>
		</div>
	);
};
export default PaymentModal;
