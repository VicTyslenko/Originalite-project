import { actionFetchAuth } from "@main/store/actions/authActions";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import { useStoreDispatch } from "hooks/use-store-dispatch";

import {
	ButtonWrapp,
	CheckBoxWrapp,
	CssTextField,
	Description,
	InputsWrapp,
	LoginWrapper,
	StyledButton,
} from "../StyledRegisterForm";

export const LoginForm = () => {
	const dispatch = useStoreDispatch();
	return (
		<>
			<Formik
				initialValues={{
					loginOrEmail: "",
					password: "",
				}}
				onSubmit={async (values, { resetForm }) => {
					await dispatch(actionFetchAuth(values));
					resetForm();
				}}
			>
				{props => (
					<LoginWrapper>
						<Description>Please enter your account details to log in</Description>

						<Form onSubmit={props.handleSubmit}>
							<InputsWrapp>
								<CssTextField
									variant="standard"
									label="E-mail"
									fullWidth
									name="loginOrEmail"
									value={props.values.loginOrEmail}
									onChange={props.handleChange}
								/>
								<CssTextField
									variant="standard"
									label="Password"
									fullWidth
									name="password"
									type="password"
									value={props.values.password}
									onChange={props.handleChange}
								/>
							</InputsWrapp>
							<CheckBoxWrapp>
								<Checkbox
									sx={{
										"& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)": {
											color: "white",
										},
									}}
								/>
								<p className="box-text">Keep me signed in</p>
							</CheckBoxWrapp>

							<ButtonWrapp>
								<StyledButton type="submit">LOG IN</StyledButton>
							</ButtonWrapp>
						</Form>
					</LoginWrapper>
				)}
			</Formik>
		</>
	);
};
