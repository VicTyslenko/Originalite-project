import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ListItemButton, ListItemText, Collapse, List, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getCategories } from '../../../../store/actions/categoriesActions';
import { setFilters } from '../../../../store/slices/filterSlice';
import { selectSubCategories } from '../../../../store/selectors/categoriesSelector';
import { selectFilterCategories } from '../../../../store/selectors/filterSelector';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { FlexBox } from './ProductFilters.styles';

function ProductFilterCategories() {
	const [open, setOpen] = useState(false);
	const [openMobile, setOpenMobile] = useState(false);
	const { category } = useParams();

	const subCategories = useSelector((state) => selectSubCategories(state, category));
	const filterCategories = useSelector(selectFilterCategories);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const handleSetFilter = useCallback(
		(value) => {
			dispatch(
				setFilters({
					categories: filterCategories === value ? null : value,
				}),
			);
		},
		[dispatch, filterCategories],
	);

	const handleCLearFilter = useCallback(() => {
		dispatch(setFilters({ categories: null }));
	}, [dispatch, filterCategories]);

	const handleClick = () => {
		setOpen(!open);
	};

	const handleClickMobile = () => {
		setOpenMobile(!openMobile);
	};

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

	return (
		<>
			{isMobile ? (
				<>
					<ListItemButton onClick={handleClickMobile}>
						<ListItemText primary="Categories" sx={{ textTransform: 'uppercase' }} />
						{openMobile ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openMobile} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }} selected={filterCategories === null}>
								<ListItemText
									primary="View all"
									onClick={() => handleCLearFilter()}
								/>
							</ListItemButton>
							{subCategories &&
								subCategories.map(({ _id: id, name }) => (
									<ListItemButton
										sx={{ pl: 4 }}
										key={id}
										onClick={() => handleSetFilter(name)}
										selected={filterCategories === name}
									>
										<ListItemText primary={name} sx={{ textTransform: 'capitalize' }} />
									</ListItemButton>
								))}
						</List>
					</Collapse>
				</>
			) : (
				<>
					<FlexBox onClick={handleClick}>
						<Typography variant="h4">{category}</Typography>
						{open ? <ExpandLess /> : <ExpandMore />}
					</FlexBox>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }} selected={filterCategories === null}>
								<ListItemText
									secondary="View all"
									onClick={() => handleCLearFilter()}
								/>
							</ListItemButton>
							{subCategories &&
								subCategories.map(({ _id: id, name }) => (
									<ListItemButton
										sx={{ pl: 4 }}
										key={id}
										onClick={() => handleSetFilter(name)}
										selected={filterCategories === name}
									>
										<ListItemText secondary={name} sx={{ textTransform: 'capitalize' }} />
									</ListItemButton>
								))}
						</List>
					</Collapse>
				</>
			)}
		</>
	);
}

export default ProductFilterCategories;
