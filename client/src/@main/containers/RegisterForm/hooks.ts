import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useFormLogin = () => {
  const errorMessage = useStoreSelector(state => state.auth.error);
  const loader = useStoreSelector(state => state.auth.loader);
  return { errorMessage, loader };
};
