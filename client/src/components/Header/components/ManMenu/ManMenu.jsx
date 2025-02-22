import { closeModal } from "@main/store/slices/modal/modalSlice";
import { Container } from "@mui/material";
import { useCategories } from "hooks/use-categories";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "../../../../@main/store/slices/filter/filterSlice";
import { AnimateMenu, ContentWrap } from "../../StyledHeader";
import { Categories, StyledLink } from "./StyledMenMenu";

function ManMenu({ active }) {
	const dispatch = useDispatch();

	const { filteredCategories: manCategories } = useCategories("man");

	const filterCategories = useSelector(state => state.filters.categories);

	const handleSetFilter = useCallback(
		value => {
			dispatch(
				setFilters({
					// categories: filterCategories === value ? null : value,
					categories: value,
				}),
			);
			dispatch(closeModal());
		},

		[filterCategories],
	);

	const handleClearFilter = useCallback(() => {
		dispatch(setFilters({ categories: null }));
		dispatch(closeModal());
	}, [filterCategories]);

	return (
		<AnimateMenu id="example-panel" duration={700} height={active}>
			<Container maxWidth="lg">
				<ContentWrap>
					<Categories>Man</Categories>
					<StyledLink to="/store/man" onClick={() => handleClearFilter()}>
						View all
					</StyledLink>
					{manCategories &&
						manCategories.map(({ name, _id }) => (
							<StyledLink key={_id} to="/store/man" onClick={() => handleSetFilter(name)}>
								{name}
							</StyledLink>
						))}
				</ContentWrap>
			</Container>
		</AnimateMenu>
	);
}

export default ManMenu;
