import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export const useUserData = () => {
	const register = useSelector(state => state.registration.data);

	const isAuth = useSelector(state => state.auth.data);

	const user = isAuth ? jwt_decode(isAuth.token) : register ? jwt_decode(register.token) : null;

	return user;
};
