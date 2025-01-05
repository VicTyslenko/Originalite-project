import { useSelector } from "react-redux";

export const useFormLogin = () => {
	const errorMessage = useSelector(state => state.auth.error);
	const registerError = useSelector(state => state.registration.error);

	return { errorMessage, registerError };
};
