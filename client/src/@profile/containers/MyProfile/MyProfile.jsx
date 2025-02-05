import { actionFetchUserData } from "@main/store/actions/authActions";
import { updateCustomer } from "@main/store/actions/customersActions";
import { Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useUserData } from "../../../hooks/use-user-data";
import { ContainerWrapp, ContentForm, Form, Title } from "./StyledMyProfile";
import validationSchema from "./validation";

function MyProfile() {
	const dispatch = useDispatch();

	const user = useUserData();

	const handleSubmit = async (values, resetForm) => {
		if (user) {
			const response = await dispatch(updateCustomer({ _id: user.id, params: values }));

			console.log("response", response.payload);
		}
	};

	return (
		<Container maxWidth="lg">
			<Title>My Account</Title>

			<ContainerWrapp>
				<ContentForm>
					<Formik
						initialValues={{
							firstName: user.firstName || "",
							lastName: user.lastName || "",
							email: user.email || "",
							mobile: user.telephone || "",
							birthday: user.birthday || "",
							gender: user.gender || "male",
						}}
						onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
						validationSchema={validationSchema}
					>
						{props => (
							<Form onSubmit={props.handleSubmit}>
								<TextField
									fullWidth
									name="email"
									placeholder="Email"
									value={props.values.email}
									onChange={props.handleChange}
									variant="standard"
									sx={{ mb: "6px" }}
								/>
								<TextField
									fullWidth
									name="firstName"
									placeholder="Name"
									value={props.values.firstName}
									onChange={props.handleChange}
									variant="standard"
									sx={{ mb: "6px" }}
								/>
								<TextField
									fullWidth
									name="lastName"
									placeholder="Last name"
									value={props.values.lastName}
									onChange={props.handleChange}
									variant="standard"
									sx={{ mb: "6px" }}
								/>

								<TextField
									fullWidth
									name="mobile"
									onChange={props.handleChange}
									value={props.values.mobile}
									placeholder="Mobile"
									// helperText={props.touched.mobile}
									// error={props.touched.mobile && Boolean(props.errors.mobile)}
									variant="standard"
									sx={{ mb: "6px" }}
								/>
								<FormControl>
									<RadioGroup
										sx={{ borderRadius: "12px" }}
										row
										name="gender"
										value={props.values.gender}
										onChange={e => props.setFieldValue("gender", e.target.value)}
									>
										<FormControlLabel value="male" control={<Radio />} label="Male" />

										<FormControlLabel value="female" control={<Radio />} label="Female" />
									</RadioGroup>
								</FormControl>

								<TextField
									fullWidth
									name="birthday"
									value={props.values.birthday}
									onChange={props.handleChange}
									label="Birthday"
									placeholder="dd/mm/yyyy"
									variant="standard"
									helperText={props.touched.birthday && props.errors.birthday}
									error={props.errors.birthday}
									sx={{ mb: "6px" }}
								/>
								<Button
									type="submit"
									variant="contained"
									sx={{
										backgroundColor: "black",
									}}
								>
									SAVE
								</Button>
							</Form>
						)}
					</Formik>
				</ContentForm>
			</ContainerWrapp>
		</Container>
	);
}

export default MyProfile;
