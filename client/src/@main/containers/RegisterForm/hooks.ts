import { errorDataAuth } from "@main/store/selectors/authSelector";
import { errorDataRegister } from "@main/store/selectors/registrationSelector";
import { useSelector } from "react-redux";

export const useFormLogin = () => {
  const errorMessage = useSelector(errorDataAuth);
  const registerError = useSelector(errorDataRegister);

  return { errorMessage, registerError };
};
