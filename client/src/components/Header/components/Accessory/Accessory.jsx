import { Container } from "@mui/material";
import { useCategories } from "hooks/use-categories";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFilterCategories } from "../../../../@main/store/selectors/filterSelector";
import { setFilters } from "../../../../@main/store/slices/filterSlice";
import { AnimateMenu, ContentWrap } from "../../StyledHeader";
import { Categories, StyledLink } from "./StyledAccessory";

function Accessory({ active, closeСategories }) {
	const dispatch = useDispatch();

	const { filteredCategories: accessoriesCategories } = useCategories("accessories");

	const filterCategories = useSelector(selectFilterCategories);

	const handleSetFilter = useCallback(
		value => {
			dispatch(
				setFilters({
					categories: filterCategories === value ? null : value,
				}),
			);
			closeСategories();
		},
		[filterCategories],
	);

	const handleClearFilter = useCallback(() => {
		dispatch(setFilters({ categories: null }));

		closeСategories();
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
