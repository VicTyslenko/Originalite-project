import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ButtonSearch, PaperStyles, SearchWrappAnimate } from "./StyledSearch";

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
				<TextField
					sx={{ width: 500 }}
					onChange={event => handleChange(event)}
					id="standard-basic"
					label="Search for item"
					variant="standard"
				/>
				<ButtonSearch onClick={() => null} type="button" aria-label="search">
					<SearchIcon />
				</ButtonSearch>
			</SearchWrappAnimate>

			{searchedItems.length > 0 && (
				<div className="">
					{searchedItems.map(item => (
						<div className="" key={item._id}>
							{item.name}
						</div>
					))}
				</div>
			)}
		</PaperStyles>
	);
}

export default Search;
