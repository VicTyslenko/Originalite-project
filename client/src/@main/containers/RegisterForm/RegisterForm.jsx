import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Checkbox, Tab } from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { registerFetchData } from "../../store/actions/registrationActions";
import {
	ButtonWrappReg,
	ContainerWrapper,
	CssTextField,
	HeadWrapp,
	InputsWrappReg,
	LoginWrapperReg,
	StyledButtonReg,
} from "./StyledRegisterForm";
import { LoginForm } from "./extensions/LoginForm";
import { useFormLogin } from "./hooks";
import { validationRegisterSchema } from "./validation";

const RegisterForm = () => {
	const dispatch = useDispatch();
	const { registerError } = useFormLogin();

	const [value, setValue] = useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<ContainerWrapper>
			<Container
				maxWidth="lg"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<TabContext value={value}>
					<HeadWrapp>
						<TabList onChange={handleChange}>
							<Tab className="list-item login" label="Login" value="1" />
							<Tab className="list-item registration" label="Registration" value="2" />
						</TabList>
					</HeadWrapp>

					<TabPanel value="1">
						<LoginForm />
					</TabPanel>

					<TabPanel value="2">
						<Formik
							initialValues={{
								firstName: "",
								lastName: "",
								login: "",
								email: "",
								password: "",
								confirmPassword: "",
							}}
							validationSchema={validationRegisterSchema}
							onSubmit={async (values, { resetForm }) => {
								const data = await dispatch(registerFetchData(values));

								if (!data.error) {
									toast.success("Register success!");
									resetForm();
								}
							}}
						>
							{props => (
								<LoginWrapperReg>
									<form onSubmit={props.handleSubmit}>
										<InputsWrappReg>
											<label>
												<p className="label-text">login</p>
												<CssTextField
													variant="standard"
													label="Login"
													name="login"
													value={props.values.login}
													onChange={props.handleChange}
													error={props.touched.login && Boolean(props.errors.login)}
													helperText={props.touched.login && props.errors.login}
												/>
											</label>
											<label>
												<p className="label-text">first name</p>
												<CssTextField
													variant="standard"
													label="Your first name"
													name="firstName"
													value={props.values.firstName}
													onChange={props.handleChange}
													error={props.touched.firstName && Boolean(props.errors.firstName)}
													helperText={props.touched.firstName && props.errors.firstName}
												/>
											</label>
											<label>
												<p className="label-text">Last name</p>
												<CssTextField
													variant="standard"
													label="Your last name"
													name="lastName"
													value={props.values.lastName}
													onChange={props.handleChange}
													error={props.touched.lastName && Boolean(props.errors.lastName)}
													helperText={props.touched.lastName && props.errors.lastName}
												/>
											</label>
											<label>
												<p className="label-text">email address</p>
												<CssTextField
													variant="standard"
													label="Email address"
													name="email"
													value={props.values.email}
													onChange={props.handleChange}
													error={props.touched.email && Boolean(props.errors.email)}
													helperText={props.touched.email && props.errors.email}
												/>
											</label>
											<label>
												<p className="label-text">password</p>
												<CssTextField
													variant="standard"
													label="Password"
													name="password"
													type="password"
													value={props.values.password}
													onChange={props.handleChange}
													error={props.touched.password && Boolean(props.errors.password)}
													helperText={props.touched.password && props.errors.password}
												/>
											</label>
											<CssTextField
												variant="standard"
												label="Confirm your password"
												name="confirmPassword"
												type="password"
												value={props.values.confirmPassword}
												onChange={props.handleChange}
												error={props.touched.confirmPassword && Boolean(props.errors.confirmPassword)}
												helperText={props.touched.confirmPassword && props.errors.confirmPassword}
											/>
										</InputsWrappReg>

										<div className="flex-error">
											{registerError && <span className="message">{Object.values(registerError)}</span>}
										</div>
										<ButtonWrappReg>
											<StyledButtonReg type="submit">Register</StyledButtonReg>
										</ButtonWrappReg>
									</form>
								</LoginWrapperReg>
							)}
						</Formik>
					</TabPanel>
				</TabContext>
			</Container>
		</ContainerWrapper>
	);
};

export default RegisterForm;
