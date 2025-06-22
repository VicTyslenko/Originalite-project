import * as S from "./styles";

import { type DefaultButtonProps } from "./models";

export const DefaultButton = ({ className, children, ...props }: DefaultButtonProps) => {
  return (
    <S.StyledButton {...props} className="default-button">
      {children}
    </S.StyledButton>
  );
};
