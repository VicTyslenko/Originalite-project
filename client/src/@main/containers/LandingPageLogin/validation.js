import * as yup from 'yup';

export const validationSchema = yup.object({
	login: yup.string().required('Enter your name').min(2, 'Name is too short'),
	firstName: yup.string().required('Enter your first name').min(2, 'Name is too short'),
	lastName: yup.string().required('Enter your last name').min(2, 'LastName is too short'),
	email: yup.string().required('Email is required').email('Not a proper email'),
	password: yup.string().required('Password is required').min(6, 'Password should be of minimum 6 characters length'),
});
