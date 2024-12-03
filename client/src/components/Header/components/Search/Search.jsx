import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

import { SearchWrappAnimate, PaperStyles, ButtonSearch } from './StyledSearch';
import {  useNavigate } from 'react-router-dom'

function Search({ active }) {

	const [ searchId, setSearchId] = useState();
	const navigate = useNavigate();

	return (
		<PaperStyles elevation={4}>
			<SearchWrappAnimate id="example-panel" duration={700} height={active}>
				<form>
					<TextField sx={{ width: 500 }} onChange={event => setSearchId(event.target.value.toLowerCase())} id="standard-basic" label="Search for item" variant="standard" />
					<ButtonSearch onClick={() => navigate(`/search/${searchId}`)}  type="button" aria-label="search">
						<SearchIcon  />
					</ButtonSearch>
				</form>
			</SearchWrappAnimate>
		</PaperStyles>
	);
}

export default Search;
