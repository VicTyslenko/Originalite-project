import * as yup from "yup";

export const validationSchema = yup.object({
	loginOrEmail: yup.string().email("Enter a valid email").required("Email is required"),
	password: yup
		.string()
		.min(7, "Password should be of minimum 7 characters length")
		.required("Password is required"),
});
