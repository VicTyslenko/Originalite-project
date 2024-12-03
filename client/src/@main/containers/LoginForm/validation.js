import * as yup from 'yup';

export const validationRegisterSchema = yup.object({
	login: yup.string().required('Enter your name').min(2, 'Name is too short'),
	firstName: yup.string().required('Enter your first name').min(2, 'Name is too short'),
	lastName: yup.string().required('Enter your last name').min(2, 'LastName is too short'),
	email: yup.string().required('Email is required').email('Enter a valid email'),
	password: yup.string().required('Password is required').min(7, 'Password should be of minimum 6 characters length'),
	confirmPassword: yup
		.string()
		.required('Password is required')
		.oneOf([yup.ref('password')], 'Password mismatch'),
});
