import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useCategories = (category: string | undefined) => {
  const allCategories = useStoreSelector(state => state.categories.data);

  const filteredCategories = allCategories ? allCategories.filter(item => item.parentId === category) : [];

  return { filteredCategories, allCategories };
};
