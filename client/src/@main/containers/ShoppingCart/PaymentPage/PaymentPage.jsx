import { Link, MenuItem, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useUserData } from "../../../../hooks/use-user-data";
import { deleteCart } from "../../../store/actions/cartActions";
import { clearCart } from "../../../store/slices/cartSlice";
import PaymentModal from "../Modal/Modal";
import SVG from "../SVG/SVG";
import SVGMaestro from "../SVG/SVGMaestro";
import SVGPayPall from "../SVG/SVGPayPall";
import { CardsWrapper, PaymentWrapper, StyledButton, Title } from "./StyledPaymentPage";

const PaymentPage = () => {
	const dispatch = useDispatch();
	const user = useUserData();

	const handleClearCart = () => {
		if (user) {
			dispatch(deleteCart(user));
		} else {
			dispatch(clearCart());
		}
	};
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	const handleClose = () => {
		navigate("/");
		setOpen(!open);
	};

	const navigate = useNavigate();
	const monthChange = event => {
		setMonth(event.target.value);
	};
	const yearChange = event => {
		setYear(event.target.value);
	};

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<PaymentWrapper>
				<Title>Please select your payment method</Title>
				<p className="total-payment">Total payment amount</p>
				<CardsWrapper>
					<SVG />
					<SVGPayPall />
					<SVGMaestro />
				</CardsWrapper>
				<div className="flex-block">
					<span className="info">Card number</span>
					<TextField variant="standard" />
				</div>
				<div className="flex-block">
					<span className="info">Card holder name</span>
					<TextField variant="standard" />
				</div>

				<div className="flex-select">
					<span className="info"> Card Expiry Date </span>
					<Select value={month} onChange={monthChange}>
						<MenuItem value={"01"}>01</MenuItem>
						<MenuItem value={"02"}>02</MenuItem>
						<MenuItem value={"03"}>03</MenuItem>
						<MenuItem value={"04"}>04</MenuItem>
						<MenuItem value={"05"}>05</MenuItem>
						<MenuItem value={"06"}>06</MenuItem>
						<MenuItem value={"07"}>07</MenuItem>
						<MenuItem value={"08"}>08</MenuItem>
						<MenuItem value={"09"}>09</MenuItem>
						<MenuItem value={"10"}>10</MenuItem>
						<MenuItem value={"11"}>11</MenuItem>
						<MenuItem value={"12"}>12</MenuItem>
					</Select>{" "}
					/
					<Select value={year} onChange={yearChange}>
						<MenuItem value={"2023"}>2023</MenuItem>
						<MenuItem value={"2024"}>2024</MenuItem>
						<MenuItem value={"2025"}>2025</MenuItem>
						<MenuItem value={"2026"}>2026</MenuItem>
						<MenuItem value={"2027"}>2027</MenuItem>
						<MenuItem value={"2028"}>2028</MenuItem>
						<MenuItem value={"2029"}>2029</MenuItem>
						<MenuItem value={"2030"}>2030</MenuItem>
						<MenuItem value={"2031"}>2031</MenuItem>
						<MenuItem value={"2032"}>2032</MenuItem>
						<MenuItem value={"2033"}>2033</MenuItem>
						<MenuItem value={"2034"}>2034</MenuItem>
						<MenuItem value={"2035"}>2035</MenuItem>
					</Select>
				</div>

				<div className="cvv">
					<span className="info">CVC/CVV/CID </span>
					<TextField
						variant="standard"
						sx={{
							width: "50px",
							paddingRight: "60px",
						}}
					/>

					<Link
						sx={{
							textDecoration: "none",
							color: "black",
							fontWeight: "bold",
						}}
						href="https://help.gopay.com/en/knowledge-base/security/what-is-cvv-cvc-code-and-where-can-i-find-it-on-my-card"
					>
						What is cvv
					</Link>
				</div>
				<StyledButton
					onClick={() => {
						handleOpen();
						handleClearCart();
					}}
				>
					Pay
				</StyledButton>

				{open && <PaymentModal open={open} close={handleClose} text="Thank you for choosing our shop!" />}
			</PaymentWrapper>
		</Container>
	);
};

export default PaymentPage;
