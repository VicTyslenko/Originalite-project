import CloseIcon from "@mui/icons-material/Close";
import { Container, Typography } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect, useState } from "react";
import { DefaultTypography } from "shared/components/typography/default-typography";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { addProductToCart } from "../../../@main/store/actions/cart/cartActions";
import { deleteProductFromCart } from "../../../@main/store/actions/cart/cartActions";
import { getWishlist } from "../../../@main/store/actions/wishlistActions";
import { deleteProductFromWishlist } from "../../../@main/store/actions/wishlistActions";
import { Content, Description, FlexWrapper, LoaderWrapp, StyledButton } from "./StyledWishList";
import { useGetWishlist } from "./hooks";

function Wishlist() {
  const dispatch = useStoreDispatch();
  const auth = useStoreSelector(state => state.auth.data);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const { wishList, cart, isLoading } = useGetWishlist();

  const itemInCart = (id: string) => cart?.some(cartItem => cartItem.product._id === id);

  const handleClick = (id: string) => {
    if (itemInCart(id)) {
      dispatch(deleteProductFromCart(id));
    } else {
      dispatch(addProductToCart(id));
    }
  };

  useEffect(() => {
    const accessToken = auth?.accessToken;

    if (accessToken) {
      dispatch(getWishlist());
    }
  }, [auth?.accessToken]);

  const MainContent = wishList?.map(({ name, currentPrice, imageUrls, colors, sizes, _id }) => (
    <Content key={_id}>
      <div className="wrapp">
        <FlexWrapper>
          <div className="image-wrapp">
            <img src={imageUrls[0]} alt={name} className="image" />
          </div>
          <Description>
            <h1 className="title">{name}</h1>
            <p className="price"> Price :{currentPrice} $</p>
            <p className="color">Color : {colors && colors[0]?.color}</p>
            <p className="size">Size : {sizes && sizes[0]}</p>
          </Description>
        </FlexWrapper>
        <div className="icon-wrapp">
          <CloseIcon
            onClick={() => {
              if (_id) {
                dispatch(deleteProductFromWishlist(_id));
              }
            }}
            sx={{
              cursor: "pointer",
            }}
          />
          <StyledButton
            onClick={() => {
              if (_id) {
                handleClick(_id);
              }
            }}
          >
            {_id && itemInCart(_id) ? "Delete from cart" : "Add to cart"}
          </StyledButton>
        </div>
      </div>
    </Content>
  ));

  useEffect(() => {
    const allPrices = wishList?.map(product => product.currentPrice) || [];

    if (allPrices.length > 0) {
      const total = allPrices.reduce((a, b) => a + b, 0);

      setTotalPrice(total);
    }
  }, [wishList]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      {wishList && wishList.length > 0 ? (
        <>
          {isLoading ? (
            <LoaderWrapp>
              <DefaultTypography>Wish list is loading...</DefaultTypography>
            </LoaderWrapp>
          ) : (
            <>
              {MainContent}
              <h2 className="total-price">Total price : {totalPrice}</h2>
            </>
          )}
        </>
      ) : (
        <Typography variant="h4" sx={{ mb: "141px", color: "black", display: "flex", justifyContent: "center" }}>
          Your wishlist is empty
        </Typography>
      )}
    </Container>
  );
}

export default Wishlist;
