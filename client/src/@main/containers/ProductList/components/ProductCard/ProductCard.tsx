import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DefaultTypography } from "shared/components/typography/default-typography";
import type { ProductData } from "shared/models/products.models";

import { StyledCardContent } from "./ProductCard.styles";

type Props = Pick<ProductData, "_id" | "currentPrice" | "name"> & { alt: string; url: string | undefined };

function ProductCard({ url, alt, name, currentPrice, _id }: Props) {
  const navigate = useNavigate();

  const handlerOpenCard = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Card sx={{ maxWidth: 370 }}>
      <CardActionArea onClick={handlerOpenCard}>
        <CardMedia component="img" image={url} alt={alt} id={_id} />
        <StyledCardContent>
          <DefaultTypography as="h2">{name}</DefaultTypography>
          <DefaultTypography>{currentPrice} $</DefaultTypography>
        </StyledCardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
