import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import ProductFilterCategories from './ProductFilterCategories';
import ProductFilterColors from './ProductFilterColors';
import ProductFilterPrice from './ProductFilterPrice';

import { StyledTypography, FiltersButton, StyledCrossIcon, StyledBoxTypography } from './ProductFilters.styles';

function MobileFilter() {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<>
			<FiltersButton onClick={handleOpen}>Filters</FiltersButton>
			<Drawer
				anchor='top'
				open={open}
				onClose={handleClose}
			>
				<StyledBoxTypography>
					<StyledTypography variant='h5' >
						Filters
					</StyledTypography>
					<StyledCrossIcon onClick={handleClose} />
				</StyledBoxTypography>
				<Divider sx={{ backgroundColor: '#3F3D3D'}}/>
				<List sx={{ height: '100vw' }}>
					<ProductFilterCategories />
					<ProductFilterColors />
					<ProductFilterPrice />
				</List>
			</Drawer>
		</>
	);
}

export default MobileFilter;
