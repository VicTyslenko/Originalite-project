import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useSelector } from "react-redux";

import { StyledBox } from "./ProductMore.styles";
import ProductMoreCard from "./ProductMoreCard";

function ProductMore() {
	const products = useSelector(state => state.productList.data);
	const isMobile = useMediaQuery(theme => theme.breakpoints.down("sm"));

	return (
		!isMobile && (
			<>
				<Box mb={2}>
					<Typography variant="title">More for you</Typography>
				</Box>
				<StyledBox>
					{products &&
						products.map(
							({ name, currentPrice, imageUrls, _id, itemNo }, index) =>
								index < 4 && (
									<ProductMoreCard
										key={_id}
										url={imageUrls[0]}
										title={name}
										price={currentPrice}
										id={_id}
										itemNo={itemNo}
									/>
								),
						)}
				</StyledBox>
			</>
		)
	);
}

export default ProductMore;
