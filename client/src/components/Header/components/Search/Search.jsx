import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ButtonSearch, PaperStyles, SearchWrappAnimate, TextFieldWrapp } from "./StyledSearch";
import { SearchResults } from "./components/SearchResults";

function Search({ active }) {
	const navigate = useNavigate();

	const [searchedItems, setSearchedItems] = useState([]);

	const allCategories = useSelector(state => state.categories.data);

	const handleChange = event => {
		const inputValue = event.target.value;

		if (!inputValue.trim()) {
			setSearchedItems([]);
			return;
		}

		const filtered = allCategories.filter(el => el.name.toLowerCase().includes(inputValue.toLowerCase()));

		setSearchedItems(filtered);
	};

	return (
		<PaperStyles elevation={4}>
			<SearchWrappAnimate id="example-panel" duration={700} height={active}>
				<TextFieldWrapp>
					<TextField
						sx={{ width: "100%" }}
						onChange={event => handleChange(event)}
						id="standard-basic"
						label="Search for item"
						variant="standard"
					/>
					<ButtonSearch onClick={() => null} type="button" aria-label="search">
						<SearchIcon />
					</ButtonSearch>
					{searchedItems.length > 0 && <SearchResults items={searchedItems} />}
				</TextFieldWrapp>
			</SearchWrappAnimate>
		</PaperStyles>
	);
}

export default Search;
