import { setFilters } from "@main/store/slices/filter/filterSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { Categories } from "shared/models/categories";

export const useCategories = () => {
  const dispatch = useStoreDispatch();

  const handleSetFilters = () => {
    dispatch(setFilters({ categories: Categories.sunglasses }));
  };

  return { handleSetFilters };
};
