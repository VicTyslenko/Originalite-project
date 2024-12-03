import React from 'react';
import { Formik, Form } from 'formik';
import { Container } from '@mui/system';
import { validationSchema } from './validation';
import { InputItem, InputsWrapp, ButtonBlock, StyledButton } from './StyledLandingPageLogin';

function LandingLoginPage() {
	return (
		<Container
			maxWidth="lg"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				marginBottom: '50px',
			}}
		>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={validationSchema}
			>
				<Form>
					<InputsWrapp>
						<InputItem
							variant="standard"
							id="demo-helper-text-misaligned-no-helper"
							label="E-mail"
							type="string"
						/>
						<InputItem
							variant="standard"
							id="demo-helper-text-misaligned-no-helper"
							label="Password"
							type="password"
						/>
					</InputsWrapp>
					<ButtonBlock>
						<StyledButton>Log in</StyledButton>
					</ButtonBlock>
				</Form>
			</Formik>
		</Container>
	);
}

export default LandingLoginPage;
