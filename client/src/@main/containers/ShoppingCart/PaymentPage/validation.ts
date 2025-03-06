import * as yup from "yup";

export const validationSchema = yup.object({
  card: yup
    .string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
  cardName: yup
    .string()
    .required("Cardholder's name is required")
    .matches(/^[a-zA-Z\s]+$/, "Cardholder's name must only contain letters"),
  month: yup
    .number()
    .required("Expiration month is required")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: yup
    .number()
    .required("Expiration year is required")
    .min(new Date().getFullYear(), "Year cannot be in the past"),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
});
