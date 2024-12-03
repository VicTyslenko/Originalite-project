import { useState } from 'react';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { Tab, Checkbox } from '@mui/material';
import { validationRegisterSchema } from './validation';
import { Formik, Form } from 'formik';
import { Container } from '@mui/system';
import {
	ContainerWrapper,
	HeadWrapp,
	Description,
	InputsWrapp,
	CheckBoxWrapp,
	StyledButton,
	ButtonWrapp,
	LoginWrapper,
	LoginWrapperReg,
	ButtonWrappReg,
	StyledButtonReg,
	InputsWrappReg,
	CssTextField,
} from './StyledLoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { registerFetchData } from '../../store/actions/registrationActions';
import { errorDataRegister } from '../../store/selectors/registrationSelector';
const LoginForm = () => {
	const dispatch = useDispatch();

	const error = useSelector(errorDataRegister);
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<ContainerWrapper>
			<Container
				maxWidth="lg"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
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
						<Formik
							initialValues={{
								email: '',
								password: '',
							}}
						>
							<LoginWrapper>
			<Description>Please enter your account details to log in</Description>
			<Form>
				<InputsWrapp>
					<CssTextField variant="standard" label="E-mail" fullWidth />
					<CssTextField variant="standard" label="Password" fullWidth />
				</InputsWrapp>
				<CheckBoxWrapp>
					<Checkbox
						sx={{
							'& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)': {
								color: 'white',
							},
						}}
					/>
					<p className="box-text">Keep me signed in</p>
				</CheckBoxWrapp>

				<ButtonWrapp>
					<StyledButton>LOG IN</StyledButton>
				</ButtonWrapp>
			</Form>
		</LoginWrapper>
	</Formik>
</TabPanel>

<TabPanel value="2">
	<Formik
		initialValues={{
			firstName: '',
			lastName: '',
			login: '',
			email: '',
			password: '',
			confirmPassword: '',
		}}
		validationSchema={validationRegisterSchema}
		onSubmit={async (values) => {
			const data = await dispatch(registerFetchData(values));
		}}
	>
		{(props) => (
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
							error={
								props.touched.confirmPassword &&
								Boolean(props.errors.confirmPassword)
							}
							helperText={
								props.touched.confirmPassword && props.errors.confirmPassword
							}
						/>
										</InputsWrappReg>
										<div className="flex-error">
											{error && <span className="message">{Object.values(error)}</span>}
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

export default LoginForm;
