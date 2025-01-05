import { Container, TextField } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addressFetchData } from "../../../@main/store/actions/addressActions";
import { useUserData } from "../../../hooks/use-user-data";
import { validationDeliverySchema } from "../../validation";
import { ContentForm, StyledLink, Title } from "../AdressDetails/StyledAddressDetails";

const AddressDetails = () => {
	const dispatch = useDispatch();

	const user = useUserData();

	const products = useSelector(state => state.cart.data);

	const navigate = useNavigate();

	return (
		<Container
			maxWidth="lg"
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Formik
				initialValues={{
					firstName: user?.firstName || "",
					lastName: user?.lastName || "",
					email: user?.email || "",
					telephone: user?.telephone || "",
					address: user?.address || "",
				}}
				enableReinitialize
				validationSchema={validationDeliverySchema}
				onSubmit={async (values, { resetForm }) => {
					dispatch(addressFetchData({ ...values, customerId: user?.id, products }));

					resetForm();
					navigate("/payment");
				}}
			>
				{props => (
					<ContentForm>
						<form onSubmit={props.handleSubmit}>
							<Title>Please, fill the form with your details and delivery address</Title>

							<TextField
								type="string"
								fullWidth
								name="email"
								value={props.values.email}
								onChange={props.handleChange}
								error={props.touched.email && Boolean(props.errors.email)}
								helperText={props.touched.email && props.errors.email}
								label="Email Adress"
								placeholder="Email"
								multiline
								variant="standard"
								sx={{ mb: "6px" }}
							/>
							<TextField
								type="string"
								fullWidth
								name="firstName"
								label="First Name"
								value={props.values.firstName}
								placeholder="Your first name"
								multiline
								variant="standard"
								onChange={props.handleChange}
								error={props.touched.firstName && Boolean(props.errors.firstName)}
								helperText={props.touched.firstName && props.errors.firstName}
							/>
							<TextField
								name="lastName"
								type="string"
								fullWidth
								label="Last name"
								placeholder="Your second name"
								multiline
								variant="standard"
								value={props.values.lastName}
								onChange={props.handleChange}
								error={props.touched.lastName && Boolean(props.errors.lastName)}
								helperText={props.touched.lastName && props.errors.lastName}
								sx={{ mb: "6px" }}
							/>

							<TextField
								type="number"
								fullWidth
								name="telephone"
								label="Mobile Phone"
								placeholder="+44"
								multiline
								variant="standard"
								value={props.values.mobile}
								onChange={props.handleChange}
								error={props.touched.mobile && Boolean(props.errors.mobile)}
								helperText={props.touched.mobile && props.errors.mobile}
								sx={{ mb: "6px" }}
							/>
							<TextField
								type="string"
								fullWidth
								label="Address"
								placeholder="address"
								name="address"
								multiline
								variant="standard"
								value={props.values.address}
								onChange={props.handleChange}
								error={props.touched.address && Boolean(props.errors.address)}
								helperText={props.touched.address && props.errors.address}
								sx={{ mb: "6px" }}
							/>

							<div>
								<div className="button-wrapp">
									<StyledLink as="button" type="submit">
										Save
									</StyledLink>
								</div>
							</div>
						</form>
					</ContentForm>
				)}
			</Formik>
		</Container>
	);
};

export default AddressDetails;
