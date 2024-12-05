


export const LoginForm = () => {
	return (
		<>
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
		</>
	);
};
