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

	birthday: Yup.string()
		.matches(/^\d{2}-\d{2}-\d{4}$/, "Invalid format. Use DD-MM-YYYY")
		.test("valid-month", "Month must be between 01 and 12", value => {
			if (!value) return false;
			const parts = value.split("-");
			if (parts.length !== 3) return false;
			const month = Number(parts[1]);
			return month >= 1 && month <= 12;
		})
		.test("valid-day", "Day must be between 01 and 31", value => {
			if (!value) return false;
			const parts = value.split("-");
			if (parts.length !== 3) return false;
			const day = Number(parts[0]);
			return day >= 1 && day <= 31;
		})
		.test("not-in-future", "Birthday cannot be in the future", value => {
			if (!value) return false;
			const parts = value.split("-");
			if (parts.length !== 3) return false;
			const day = Number(parts[0]);
			const month = Number(parts[1]) - 1;
			const year = Number(parts[2]);
			const date = new Date(year, month, day);
			return date <= new Date();
		}),
});

export default validationSchema;
