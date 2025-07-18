import * as yup from "yup";

export const validationDeliverySchema = yup.object({
  firstName: yup.string().required("Enter your first name").min(2, "Name is too short"),

  // lastName: yup.string().required("Enter your last name").min(2, "LastName is too short"),
  // email: yup.string().required("Email is required").email("Enter a valid email"),

  // address: yup.string().required("Address is required"),
  // telephone: yup
  //   .string()
  //   .required("Phone number is required")
  //   .matches(/^\+\d{1,3}\d{6,14}$/, "Enter a valid phone number"),
});
