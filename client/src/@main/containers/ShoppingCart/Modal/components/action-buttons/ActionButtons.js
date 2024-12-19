import { Button } from "@mui/material";

import * as S from "./StyledActionButtons";

export const ActionButtons = ({ confirm, cancel }) => {
	return (
		<S.ButtonsWrapp>
			<Button onClick={confirm}>Remove item</Button>
			<Button onClick={cancel}>No, keep it</Button>
		</S.ButtonsWrapp>
	);
};
