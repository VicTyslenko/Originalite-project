import * as S from "./styles";

import { setFilters } from "@main/store/slices/filterSlice";
import { closeModal } from "@main/store/slices/modalSlice";
import { useDispatch } from "react-redux";

export const SearchResults = ({ items }) => {
	const dispatch = useDispatch();

	const handleSetFilter = value => {
		dispatch(
			setFilters({
				categories: value,
			}),
		);
		dispatch(closeModal());
	};
	console.log(items);

	return (
		<S.SearchWrapper>
			{items.map(item => (
				<S.ItemWrapp key={item._id}>
					<S.StyledLink
						to={`/store/${item.parentId ? item.parentId : item.name}`}
						onClick={() => {
							handleSetFilter(item.name);
						}}
					>
						<S.SearchedItem>{item.name}</S.SearchedItem>
						<S.Categories>{item.parentId}</S.Categories>
					</S.StyledLink>
				</S.ItemWrapp>
			))}
		</S.SearchWrapper>
	);
};
