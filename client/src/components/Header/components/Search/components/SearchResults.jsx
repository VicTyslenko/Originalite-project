import * as S from "./styles";

import { setFilters } from "@main/store/slices/filterSlice";
import { closeModal } from "@main/store/slices/modalSlice";
import { useDispatch } from "react-redux";

export const SearchResults = ({ items }) => {
	const dispatch = useDispatch();

	const handleSetFilter = value => {
		setFilters({
			categories: value,
		});
		dispatch(closeModal());
	};
	return (
		<S.SearchWrapper>
			{items.map(item => (
				<S.ItemWrapp key={item._id}>
					<S.StyledLink
						to={`/store/${item.parentId ? item.parentId : item.name}`}
						onClick={() => handleSetFilter(item.name)}
					>
						{item.name}
					</S.StyledLink>
				</S.ItemWrapp>
			))}
		</S.SearchWrapper>
	);
};
