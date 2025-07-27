import * as yup from "yup";

export const validationSchema = yup.object({
  discount: yup.string(),
});
