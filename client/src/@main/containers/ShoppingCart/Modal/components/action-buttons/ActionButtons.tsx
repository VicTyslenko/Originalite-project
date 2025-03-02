import { Button } from "@mui/material";

import * as S from "./StyledActionButtons";
import type { ActionButtonsProps } from "./models";

export const ActionButtons = ({ confirm, cancel, confirmText = "Ok", cancelText = "Cancel" }: ActionButtonsProps) => {
  return (
    <S.ButtonsWrapp>
      <Button onClick={confirm}>{confirmText}</Button>
      <Button onClick={cancel}>{cancelText}</Button>
    </S.ButtonsWrapp>
  );
};
