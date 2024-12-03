import React from "react";
import { Link } from "react-router-dom";
import { StyledDiv, StyledText, StyledWrapper } from './EndSale.styles'

function EndSale( ){
 return (
    <Link to="/store/man">
		<img src="https://www.louisvuitton.com/images/is/image/lv/M_BC_PRECOSS25_DL2_Nov28_03_DII.jpg?wid=2400" />
		<StyledWrapper>
			<StyledText>end-of-season sale</StyledText>
			<StyledDiv>
				<span>SH</span>OP NOW
			</StyledDiv>
		</StyledWrapper>
    </Link>
 )
}

export default EndSale;
