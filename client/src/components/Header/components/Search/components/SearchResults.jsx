import * as S from "./styles";

import { setFilters } from "@main/store/slices/filterSlice";
import { closeModal } from "@main/store/slices/modalSlice";
import { useDispatch } from "react-redux";

export const SearchResults = ({ items, clearInput, setSearchItems }) => {
	const dispatch = useDispatch();

	const handleSetFilter = value => {
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
