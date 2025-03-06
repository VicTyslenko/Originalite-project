import type { CategoriesProps } from "@main/store/slices/categories/models";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useState } from "react";
import type { Height } from "react-animate-height";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { ButtonSearch, PaperStyles, SearchWrappAnimate, TextFieldWrapp } from "./StyledSearch";
import { SearchResults } from "./components/SearchResults";

function Search({ active }: { active: Height }) {
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

  return (
    <PaperStyles elevation={4}>
      <SearchWrappAnimate id="example-panel" duration={700} height={active}>
        <TextFieldWrapp>
          <TextField
            sx={{ width: "100%" }}
            onChange={handleChange}
            id="standard-basic"
            label="Search for item"
            variant="standard"
            value={inputValue}
          />
          <ButtonSearch onClick={() => null} type="button">
            <SearchIcon />
          </ButtonSearch>
          {searchedItems.length > 0 && (
            <SearchResults
              clearInput={() => {
                setInputValue("");
              }}
              items={searchedItems}
              setSearchItems={setSearchedItems}
            />
          )}
        </TextFieldWrapp>
      </SearchWrappAnimate>
    </PaperStyles>
  );
}

export default Search;
