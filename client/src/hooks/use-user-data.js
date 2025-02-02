import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export const useUserData = () => {
	const register = useSelector(state => state.registration.data);

	const tempAuth = useSelector(state => state.tempAuth.tempData);

	const isAuth = useSelector(state => state.auth.data);

	const user = isAuth ? jwt_decode(register.token) : tempAuth ? jwt_decode(tempAuth.token) : null;

	return user;
};
