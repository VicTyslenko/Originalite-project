import { deleteCart } from "@main/store/actions/cartActions";
import { MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import PaymentModal from "../Modal/Modal";
import SVG from "../SVG/SVG";
import SVGMaestro from "../SVG/SVGMaestro";
import SVGPayPall from "../SVG/SVGPayPall";
import { CardsWrapper, PaymentWrapper, StyledButton, Title } from "./StyledPaymentPage";
import { monthOptions, yearOptions } from "./data";
import { validationSchema } from "./validation";

const PaymentPage = () => {
	const navigate = useNavigate();

	const [modal, setModal] = useState(false);

	const dispatch = useDispatch();

	const handleCloseModal = () => {
		setModal(false);
		// navigate("/");
	};

	const handleFormSubmit = (values, reset) => {
		dispatch(deleteCart());
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

				<Formik
					initialValues={{
						card: "",
						cardName: "",
						month: "1",
						year: "2025",
						cvv: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { resetForm }) => {
						// resetForm();
					}}
				>
					{props => (
						<form onSubmit={props.handleSubmit}>
							<div className="flex-block">
								<span className="info">Card number</span>
								<TextField
									variant="standard"
									value={props.values.card}
									onChange={props.handleChange}
									name="card"
									error={props.touched.card && Boolean(props.errors.card)}
									helperText={props.errors.card}
								/>
							</div>

							<div className="flex-block">
								<span className="info">Card holder name</span>
								<TextField
									variant="standard"
									value={props.values.cardName}
									onChange={props.handleChange}
									name="cardName"
									error={props.touched.cardName && Boolean(props.errors.cardName)}
									helperText={props.errors.cardName}
								/>
							</div>

							<div className="flex-select">
								<span className="info"> Card Expiry Date </span>
								<Select value={props.values.month} name="month" onChange={props.handleChange}>
									{monthOptions.map(month => (
										<MenuItem key={month.value} value={month.value}>
											{month.label}
										</MenuItem>
									))}
								</Select>{" "}
								/
								<Select value={props.values.year} onChange={props.handleChange} name="year">
									{yearOptions.map(year => (
										<MenuItem key={year.value} value={year.value}>
											{year.label}
										</MenuItem>
									))}
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
									value={props.values.cvv}
									name="cvv"
									onChange={props.handleChange}
									error={props.touched.cvv && Boolean(props.errors.cvv)}
									helperText={props.errors.cvv}
								/>

								<Tooltip
									title="CVV (Card Verification Value) is a 3 or 4-digit security code on your credit or debit card used to verify your identity during online or phone transactions."
									placement="top"
								>
									<span className="tooltip-cvv">cvv</span>
								</Tooltip>
							</div>
							<StyledButton type="submit">Pay</StyledButton>
						</form>
					)}
				</Formik>

				{modal && <PaymentModal open={modal} close={handleCloseModal} text="Thank you for choosing our shop!" />}
			</PaymentWrapper>
		</Container>
	);
};

export default PaymentPage;
