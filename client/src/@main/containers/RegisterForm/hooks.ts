import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useFormLogin = () => {
  const errorMessage = useStoreSelector(state => state.auth.error);

  return { errorMessage };
};
