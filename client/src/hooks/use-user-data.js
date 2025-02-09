import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export const useUserData = () => {
	const tempAuth = useSelector(state => state.tempAuth.tempData);

	const isAuth = useSelector(state => state.auth.data);

	const token = isAuth?.token || tempAuth?.token;

	if (!token) {
		return null;
	}

	const user = jwt_decode(token);

	return user;
};
