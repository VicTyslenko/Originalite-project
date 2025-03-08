import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DefaultTypography } from "shared/components/typography/default-typography";

import { StyledCardContent } from "./ProductMore.styles";
import type { ProductMoreProps } from "./models";

function ProductMoreCard({ url, name, currentPrice, _id, itemNo }: ProductMoreProps) {
  const navigate = useNavigate();

  const handlerOpenCard = () => {
    navigate(`/product/${itemNo}`);
  };

  return (
    <Card sx={{ maxWidth: 277 }}>
      <CardActionArea onClick={handlerOpenCard}>
        <CardMedia component="img" image={url} id={_id} />
        <StyledCardContent>
          <DefaultTypography>{name}</DefaultTypography>

          <Typography variant="body2" color="text.secondary">
            {currentPrice} $
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductMoreCard;
