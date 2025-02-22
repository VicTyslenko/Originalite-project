import { closeModal } from "@main/store/slices/modal/modalSlice";
import { Container } from "@mui/material";
import { useCategories } from "hooks/use-categories";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFilters } from "../../../../@main/store/slices/filter/filterSlice";
import { AnimateMenu, ContentWrap } from "../../StyledHeader";
import { Categories, StyledLink } from "./StyledAccessory";

function Accessory({ active }) {
	const dispatch = useDispatch();

	const { filteredCategories: accessoriesCategories } = useCategories("accessories");

	const filterCategories = useSelector(state => state.filters.categories);

	const handleSetFilter = useCallback(value => {
		dispatch(
			setFilters({
				categories: value,
			}),
		);
		dispatch(closeModal());
	}, []);

	const handleClearFilter = useCallback(() => {
		dispatch(setFilters({ categories: null }));

		dispatch(closeModal());
	}, [filterCategories]);

	return (
		<AnimateMenu id="example-panel" duration={700} height={active}>
			<Container maxWidth="lg">
				<ContentWrap>
					<Categories>Accessories</Categories>
					<StyledLink to="/store/accessories" onClick={() => handleClearFilter()}>
						View all
					</StyledLink>
					{accessoriesCategories &&
						accessoriesCategories.map(({ name, _id }) => (
							<StyledLink key={_id} to="/store/accessories" onClick={() => handleSetFilter(name)}>
								{name}
							</StyledLink>
						))}
				</ContentWrap>
			</Container>
		</AnimateMenu>
	);
}

export default Accessory;
