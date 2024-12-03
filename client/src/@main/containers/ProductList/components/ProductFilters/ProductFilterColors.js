import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getColors } from '../../../../store/actions/colorsActions';
import { setFilters } from '../../../../store/slices/filterSlice';
import { selectFilterColors } from '../../../../store/selectors/filterSelector';
import { selectColors } from '../../../../store/selectors/colorsSelector';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemIconColor, ColorIcon, FlexBox } from './ProductFilters.styles';

function ProductFilterColors() {
	const [open, setOpen] = useState(false);
	const [openMobile, setOpenMobile] = useState(false);

	const colorsList = useSelector(selectColors);
	const filterColors = useSelector(selectFilterColors);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getColors())
	}, [dispatch]);

	const handleSetFilter = useCallback((color) => {
		if(filterColors.includes(color)) {
			dispatch(setFilters({
				colors: filterColors.filter((el) => el !== color)
			}))
		} else {
			dispatch(setFilters({
				colors: [...filterColors, color]
			}))
		}
	}, [dispatch, filterColors]);

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
						<ListItemText primary="Colors" sx={{ textTransform: 'uppercase'}} />
						{openMobile ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openMobile} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
						{colorsList && colorsList.map(({ _id: id, color, hash: backgroundColor}) => (
							<ListItemButton
								key={id}
								onClick={() => handleSetFilter(color)}
								selected={filterColors.includes(color)}
							>
								<ListItemIconColor >
									<ColorIcon sx={{ backgroundColor: {backgroundColor} }} />
								</ListItemIconColor>
								<ListItemText primary={color} />
							</ListItemButton>
						))}
						</List>
					</Collapse>
				</>
			) : (
				<>
					<FlexBox onClick={handleClick}>
						<Typography variant="h4">
							Colors
						</Typography>
						{open ? <ExpandLess /> : <ExpandMore />}
					</FlexBox>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List>
							{colorsList && colorsList.map(({ _id: id, color, hash: backgroundColor}) => (
								<ListItemButton
									key={id}
									onClick={() => handleSetFilter(color)}
									selected={filterColors.includes(color)}
								>
									<ListItemIconColor >
										<ColorIcon sx={{ backgroundColor: {backgroundColor} }} />
									</ListItemIconColor>
									<ListItemText secondary={color} />
								</ListItemButton>
							))}
						</List>
					</Collapse>
				</>
			)}
		</>
	);
}

export default ProductFilterColors;
