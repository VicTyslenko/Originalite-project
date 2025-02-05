import * as Yup from "yup";

const validationSchema = Yup.object().shape({
	firstName: Yup.string()
		.trim()
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must be at most 50 characters")
		.required("First name is required"),

	lastName: Yup.string()
		.trim()
		.min(2, "Last name must be at least 2 characters")
		.max(50, "Last name must be at most 50 characters")
		.required("Last name is required"),

	email: Yup.string().email("Invalid email format").required("Email is required"),

	mobile: Yup.number().required("Phone number is required").min(5, "number is too short"),

	birthday: Yup.date().max(new Date(), "Birthday cannot be in the future"),
});

export default validationSchema;
