import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories, StyledLink } from './StyledMenMenu';
import { Container } from '@mui/material';
import { AnimateMenu, ContentWrap } from '../../StyledHeader';
import { selectSubCategories } from '../../../../@main/store/selectors/categoriesSelector';
import { getCategories } from '../../../../@main/store/actions/categoriesActions';
import { setFilters } from '../../../../@main/store/slices/filterSlice';
import { selectFilterCategories } from '../../../../@main/store/selectors/filterSelector';

function ManMenu({ active, closeСategories }) {
	const dispatch = useDispatch();

	const subCategories = useSelector((state) => selectSubCategories(state, 'man'));
	const filterCategories = useSelector(selectFilterCategories);

	useEffect(() => {
		dispatch(getCategories());
	}, []);

	const handleSetFilter = useCallback(
		(value) => {
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
					<Categories>Man</Categories>
					<StyledLink to="/store/man" onClick={() => handleClearFilter()}>
						View all
					</StyledLink>
					{subCategories &&
						subCategories.map(({ name, _id }) => (
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

ManMenu.defaultProps = {
	height: 0,
};
