import { ListItemText, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentColor } from "../../../../store/selectors/productSelector";
import { setColor } from "../../../../store/slices/productSlice";
import { ColorIcon, ColorList, ListItemButtonStyled, ListItemIconColor, ListStyled } from "./ProductInfo.styles";

function ProductInfoColors({ colors }) {
	const currentColor = useSelector(selectCurrentColor);
	const dispatch = useDispatch();

	const handleListColorClick = value => {
		dispatch(setColor(value));
	};

	return (
		<ColorList>
			<Typography variant="subtitle2">Color</Typography>
			<ListStyled>
				{colors.map(({ color, hash }) => (
					<ListItemButtonStyled
						key={color}
						selected={currentColor === color}
						onClick={() => handleListColorClick(color)}
					>
						<ListItemIconColor>
							<ColorIcon backgroundColor={hash} />
						</ListItemIconColor>
						<ListItemText primary={color} />
					</ListItemButtonStyled>
				))}
			</ListStyled>
		</ColorList>
	);
}

export default ProductInfoColors;
