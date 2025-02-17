import { Link } from "react-router-dom";

import { StyledDiv, StyledText, StyledWrapper } from "./EnjoyOff.styles";

function EnjoyOff() {
	return (
		<Link to="/store/woman">
			<img src="https://uk.louisvuitton.com/content/dam/lv/online/high-end/women/handbags/W_LG_Neverfull_Inside_Out_v2.html/jcr:content/assets/moodboard_3/NEVERFULL_INSIDE_OUT_HERO03A_LVCOM_1600x2000_DII.jpg?imwidth=2400" />

			<StyledWrapper>
				<StyledText>enjoy 70% off</StyledText>
				<StyledDiv>
					<span>SH</span>OP NOW
				</StyledDiv>
			</StyledWrapper>
		</Link>
	);
}

export default EnjoyOff;
