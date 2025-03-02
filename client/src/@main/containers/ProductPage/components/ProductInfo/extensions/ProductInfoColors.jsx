import { ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setColor } from "@main/store/slices/product/productSlice";
import { ColorIcon, ColorList, ListItemButtonStyled, ListItemIconColor, ListStyled } from "../StyledProductInfo";

function ProductInfoColors({ colors }) {
	const currentColor = useSelector(state => state.product.currentColor);
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
