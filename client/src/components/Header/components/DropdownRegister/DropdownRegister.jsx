import { Button, Container } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { actionFetchAuth } from "../../../../@main/store/actions/authActions";
import { errorDataAuth } from "../../../../@main/store/selectors/authSelector";
import {
	BoxWrapp,
	ButtonBlock,
	FormPages,
	Header,
	InputItem,
	InputsWrapp,
	LinkItem,
	WrappAnimate,
} from "./StyledDropdownRegister";
import { validationSchema } from "./validation";

function DropdownRegister({ active, closeFormPages }) {
	const dispatch = useDispatch();
	const errorMessage = useSelector(errorDataAuth);

	return (
		<WrappAnimate id="example-panel" duration={500} height={active}>
			<Container maxWidth="lg">
				<BoxWrapp>
					<Header>
						<span className="details">Enter your details</span>
					</Header>
					<Formik
						initialValues={{
							loginOrEmail: "",
							password: "",
						}}
						// validationSchema={validationSchema}
						onSubmit={async (values, { resetForm }) => {
							await dispatch(actionFetchAuth(values));
							resetForm();
						}}
					>
						{props => (
							<form onSubmit={props.handleSubmit}>
								<InputsWrapp>
									<InputItem
										variant="standard"
										name="loginOrEmail"
										label="E-mail"
										value={props.values.loginOrEmail}
										onChange={props.handleChange}
										error={props.touched.loginOrEmail && Boolean(props.errors.loginOrEmail)}
										helperText={props.touched.loginOrEmail && props.errors.loginOrEmail}
									/>
									<InputItem
										variant="standard"
										name="password"
										label="Password"
										type="password"
										value={props.values.password}
										onChange={props.handleChange}
										error={props.touched.password && Boolean(props.errors.password)}
										helperText={props.touched.password && props.errors.password}
									/>
								</InputsWrapp>

								{errorMessage && <span className="error-message">{Object.values(errorMessage)}</span>}

								<ButtonBlock>
									<Button variant="contained" color="success" type="submit">
										Log in
									</Button>
								</ButtonBlock>
							</form>
						)}
					</Formik>

					<FormPages>
						Not registered yet ?
						<LinkItem to="/login-form" onClick={() => closeFormPages()}>
							Sing Up
						</LinkItem>
					</FormPages>
				</BoxWrapp>
			</Container>
		</WrappAnimate>
	);
}

export default DropdownRegister;
