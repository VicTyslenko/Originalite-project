import React from "react";
import { Link } from "react-router-dom";

import { StyledDiv, StyledText, StyledWrapper } from "./NewCollection.styles";

function NewCollection() {
	return (
		<Link to="/store/man">
			<img src="https://www.louisvuitton.com/images/is/image/lv/M_BC_PRECOSS25_DL2_Nov28_01_DII.jpg?wid=2400" />
			<StyledWrapper>
				<StyledText>new collection</StyledText>
				<StyledDiv>
					<span>SH</span>OP NOW
				</StyledDiv>
			</StyledWrapper>
		</Link>
	);
}

export default NewCollection;
