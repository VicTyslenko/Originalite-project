import { Container } from "@mui/system";
import type { ReactNode } from "react";

import { Description } from "./StyledEmptyCart";

type Props = {
  children?: ReactNode;
  description?: string | null;
};

export const EmptyCart = ({ children, description }: Props) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        margin: "100px 0 100px 0",
      }}
    >
      {children}
      {description && <Description>{description}</Description>}
    </Container>
  );
};
