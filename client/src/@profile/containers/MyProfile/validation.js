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
	telephone: Yup.string()
		.required("Phone number is required")
		.test("starts-with-plus", "Phone number must start with '+'", value => {
			return value?.startsWith("+");
		})
		.min(7, "Phone number is too short (minimum 7 characters).")
		.max(15, "Phone number is too long (maximum 15 characters).")
		.matches(/^\+\d+$/, "Phone number must contain only numbers after '+'"),

	birthday: Yup.date().max(new Date(), "Birthday cannot be in the future"),
});

export default validationSchema;
