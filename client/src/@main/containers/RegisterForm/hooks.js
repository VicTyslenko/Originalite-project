import { useSelector } from "react-redux";

export const useFormLogin = () => {
	const errorMessage = useSelector(state => state.auth.error);

	return { errorMessage };
};
