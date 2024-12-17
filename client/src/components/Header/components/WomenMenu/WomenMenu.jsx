import { closeModal } from "@main/store/slices/modalSlice";
import { Container } from "@mui/material";
import { useCategories } from "hooks/use-categories";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFilterCategories } from "../../../../@main/store/selectors/filterSelector";
import { setFilters } from "../../../../@main/store/slices/filterSlice";
import { AnimateMenu, ContentWrap } from "../../StyledHeader";
import { Categories, StyledLink } from "./StyledWomenMenu";

function WomanMenu({ active }) {
	const dispatch = useDispatch();

	const { filteredCategories: womanCategories } = useCategories("woman");
	console.log({ test: womanCategories });

	const filterCategories = useSelector(selectFilterCategories);

	const handleSetFilter = useCallback(
		value => {
			dispatch(
				setFilters({
					categories: filterCategories === value ? null : value,
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
					<Categories>Woman</Categories>
					<StyledLink to="/store/woman" onClick={() => handleClearFilter()}>
						View all
					</StyledLink>
					{womanCategories &&
						womanCategories.map(({ name, _id }) => (
							<StyledLink key={_id} to="/store/woman" onClick={() => handleSetFilter(name)}>
								{name}
							</StyledLink>
						))}
				</ContentWrap>
			</Container>
		</AnimateMenu>
	);
}

export default WomanMenu;
