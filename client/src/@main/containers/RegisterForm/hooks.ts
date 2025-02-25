import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useFormLogin = () => {
	const errorMessage = useStoreSelector(state => state.auth.error || state.tempAuth.error);

	const registrationError = useStoreSelector(state => state.registration.error);

	return { errorMessage, registrationError };
};
