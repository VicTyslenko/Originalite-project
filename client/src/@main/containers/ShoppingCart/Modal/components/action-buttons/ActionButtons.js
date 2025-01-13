import { Button } from "@mui/material";

import * as S from "./StyledActionButtons";

export const ActionButtons = ({ confirm, cancel, confirmText = "Ok", cancelText = "Cancel" }) => {
	return (
		<S.ButtonsWrapp>
			<Button onClick={confirm}>{confirmText}</Button>
			<Button onClick={cancel}>{cancelText}</Button>
		</S.ButtonsWrapp>
	);
};
