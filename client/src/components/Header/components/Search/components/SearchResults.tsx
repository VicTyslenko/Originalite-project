import * as S from "./styles";

import type { CategoriesProps } from "@main/store/slices/categories/models";
import { setFilters } from "@main/store/slices/filter/filterSlice";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useDispatch } from "react-redux";

type SearchProps = {
  items: CategoriesProps[];
  clearInput: () => void;
  setSearchItems: (items: CategoriesProps[]) => void;
};

export const SearchResults = ({ items, clearInput, setSearchItems }: SearchProps) => {
  const dispatch = useDispatch();

  const handleSetFilter = (value: string) => {
    dispatch(
      setFilters({
        categories: value,
      }),
    );
    dispatch(closeModal());
  };

  return (
    <S.SearchWrapper>
      {items.map(item => (
        <S.ItemWrapp key={item._id}>
          <S.StyledLink
            to={`/store/${item.parentId}`}
            onClick={() => {
              handleSetFilter(item.name);
              if (item.name === "man" || item.name === "woman") dispatch(setFilters({ categories: null }));
              clearInput();
              setSearchItems([]);
            }}
          >
            <S.SearchedItem>{item.name || item.parentId}</S.SearchedItem>
            <S.Categories>{item.parentId}</S.Categories>
          </S.StyledLink>
        </S.ItemWrapp>
      ))}
    </S.SearchWrapper>
  );
};
