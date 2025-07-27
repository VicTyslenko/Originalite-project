import { Button } from "@mui/material";

import * as S from "./StyledActionButtons";
import type { ActionButtonsProps } from "./models";

export const ActionButtons = ({
  onConfirm,
  onCancel,
  confirmText = "Ok",
  cancelText = "Cancel",
}: ActionButtonsProps) => {
  return (
    <S.ButtonsWrapp>
      <Button onClick={onConfirm}>{confirmText}</Button>
      <Button onClick={onCancel}>{cancelText}</Button>
    </S.ButtonsWrapp>
  );
};
