import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";

import { StyledButton } from "./BackButton.styles";

function BackButton() {
  const navigate = useNavigate();

  return (
    <StyledButton startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
      Back
    </StyledButton>
  );
}

export default BackButton;
