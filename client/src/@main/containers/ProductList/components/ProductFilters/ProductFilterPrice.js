import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import debounce from 'lodash.debounce';
import { Box, Slider, Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { setFilters } from '../../../../store/slices/filterSlice';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StyledFilterPriceBox, MobileFilterPriceBox } from './ProductFilters.styles';

const MIN_PRICE = 0;
const MAX_PRICE = 2500;

function ProductFilterPrice() {
	const dispatch = useDispatch();

	const [value, setValue] = useState([MIN_PRICE, MAX_PRICE]);
	const [open, setOpen] = useState(false);

	const onSetFilter = (newValue) => {
		const [ minPrice, maxPrice ] = newValue;
		dispatch(setFilters({ minPrice, maxPrice }))
	}

	const handleSetFilter = useCallback(debounce(onSetFilter, 1000), []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		handleSetFilter(newValue);
	};

	const handleClick = () => {
		setOpen(!open);
	};

	const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

	return (
		<>
			{isMobile ? (
				<Box>
					<ListItemButton onClick={handleClick}>
						<ListItemText primary="Price" sx={{ textTransform: 'uppercase'}} />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<MobileFilterPriceBox>
								<Typography variant="subtitle1" pb={2} sx={{ color: '#000'}} >
									$ {value[0]} - $ {value[1]}
								</Typography>
								<StyledFilterPriceBox>
									<Slider
										getAriaLabel={() => 'Price range'}
										value={value}
										onChange={handleChange}
										valueLabelDisplay="auto"
										valueLabelFormat={(label) => `$${label}`}
										min={MIN_PRICE}
										max={MAX_PRICE}
									/>
								</StyledFilterPriceBox>
							</MobileFilterPriceBox>
						</List>
					</Collapse>
				</Box>
			) : (
				<Box>
					<Typography variant="h4" pb={2}>
						Price
					</Typography>
					<Typography variant="subtitle1" pb={2}>
						$ {value[0]} - $ {value[1]}
					</Typography>
					<StyledFilterPriceBox>
						<Slider
							getAriaLabel={() => 'Price range'}
							value={value}
							onChange={handleChange}
							valueLabelDisplay="auto"
							valueLabelFormat={(label) => `$${label}`}
							min={MIN_PRICE}
							max={MAX_PRICE}
						/>
					</StyledFilterPriceBox>
				</Box>
			)}
		</>
	);
}

export default ProductFilterPrice;
