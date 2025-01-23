import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Container } from "@mui/material";
import { DefaultTypography } from "shared/components/typography/default-typography";

import { Wrapper } from "./ContactLandingPage.styles";

function ContactLandingPage() {
	return (
		<Container
			maxWidth="lg"
			sx={{
				marginBottom: "50px",
				marginTop: "50px",
			}}
		>
			<Wrapper>
				<LocalPhoneIcon sx={{ marginLeft: "150px", marginRight: "20px" }} />
				<DefaultTypography>+38-(050)-555-55-55</DefaultTypography>
				<EmailIcon sx={{ marginLeft: "150px", marginRight: "20px" }} />
				<DefaultTypography>originalite@gmail.com</DefaultTypography>
			</Wrapper>
		</Container>
	);
}

export default ContactLandingPage;
