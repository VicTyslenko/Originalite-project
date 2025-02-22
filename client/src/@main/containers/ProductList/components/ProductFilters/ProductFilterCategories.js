import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCategories } from "hooks/use-categories";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setFilters } from "../../../../store/slices/filter/filterSlice";
import { FlexBox } from "./ProductFilters.styles";

function ProductFilterCategories() {
	const [open, setOpen] = useState(false);
	const [openMobile, setOpenMobile] = useState(false);
	const { category } = useParams();

	const { filteredCategories: paramsCategories } = useCategories(category);
	const filterCategories = useSelector(state => state.filters.categories);

	const dispatch = useDispatch();

	const handleSetFilter = useCallback(
		value => {
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

	const isMobile = useMediaQuery(theme => theme.breakpoints.down("sm"));

	return (
		<>
			{isMobile ? (
				<>
					<ListItemButton onClick={handleClickMobile}>
						<ListItemText primary="Categories" sx={{ textTransform: "uppercase" }} />
						{openMobile ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={openMobile} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton sx={{ pl: 4 }} selected={filterCategories === null}>
								<ListItemText primary="View all" onClick={() => handleCLearFilter()} />
							</ListItemButton>
							{paramsCategories &&
								paramsCategories.map(({ _id: id, name }) => (
									<ListItemButton
										sx={{ pl: 4 }}
										key={id}
										onClick={() => handleSetFilter(name)}
										selected={filterCategories === name}
									>
										<ListItemText primary={name} sx={{ textTransform: "capitalize" }} />
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
								<ListItemText secondary="View all" onClick={() => handleCLearFilter()} />
							</ListItemButton>
							{paramsCategories &&
								paramsCategories.map(({ _id: id, name }) => (
									<ListItemButton
										sx={{ pl: 4 }}
										key={id}
										onClick={() => handleSetFilter(name)}
										selected={filterCategories === name}
									>
										<ListItemText secondary={name} sx={{ textTransform: "capitalize" }} />
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
