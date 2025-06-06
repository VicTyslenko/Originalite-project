import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import type { Height } from "react-animate-height";

import { ButtonSearch, PaperStyles, SearchWrappAnimate, TextFieldWrapp } from "./StyledSearch";
import { SearchResults } from "./components/SearchResults";
import { useSearch } from "./hooks";

function Search({ active }: { active: Height }) {
  const { handleChange, handleEnterPress, searchedItems, setSearchedItems, inputValue, setInputValue } = useSearch();

  return (
    <PaperStyles elevation={4}>
      <SearchWrappAnimate id="example-panel" duration={700} height={active}>
        <TextFieldWrapp>
          <TextField
            sx={{ width: "100%" }}
            onChange={handleChange}
            onKeyDown={handleEnterPress}
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
