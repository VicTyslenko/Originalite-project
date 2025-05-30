import type { CategoriesProps } from "@main/store/slices/categories/models";
import { setFilters } from "@main/store/slices/filter/filterSlice";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useSearch = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const allCategories = useStoreSelector(state => state.categories.data);

  const [inputValue, setInputValue] = useState("");
  const [searchedItems, setSearchedItems] = useState<CategoriesProps[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setSearchedItems([]);
      return;
    }

    const filtered = allCategories.filter(el => {
      if (el.name) {
        return el.name.toLowerCase().includes(value.toLowerCase());
      } else {
        return el.parentId.toLowerCase().includes(value.toLowerCase());
      }
    });

    setSearchedItems(filtered);
  };

  const handleFilterNavigate = (navigateValue: string, categories: string | null = null) => {
    dispatch(
      setFilters({
        categories,
      }),
    );

    navigate(`store/${navigateValue}`);
    dispatch(closeModal());
    setInputValue("");
    setSearchedItems([]);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      for (let i of searchedItems) {
        if (!i.name) {
          handleFilterNavigate(inputValue);
          break;
        } else if (i.parentId === "accessories") {
          handleFilterNavigate(i.parentId, inputValue);
          break;
        } else {
          handleFilterNavigate(i.parentId, inputValue);
          break;
        }
      }
    }
  };

  return { handleChange, inputValue, searchedItems, handleEnterPress, setInputValue, setSearchedItems };
};
