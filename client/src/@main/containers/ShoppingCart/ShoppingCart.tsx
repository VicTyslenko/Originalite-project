import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "shared/components/typography/default-button/default-button";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import EmptyCart from "./EmptyCart/EmptyCart";
import * as S from "./StyledShoppingCart";
import { CartItem } from "./extensions/CartItem";

function ShoppingCart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useStoreSelector(state => state.cart.products);
  const navigate = useNavigate();
  const itemPrice = cart.map(el => el.product.currentPrice * el.cartQuantity);

  useEffect(() => {
    const totalResult = itemPrice.reduce((a, b) => a + b);
    setTotalPrice(totalResult);
  }, [itemPrice]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: "50px",
        marginTop: "40px",
      }}
    >
      {cart && cart.length > 0 ? (
        <S.ShoppingCartWrapp>
          <S.LeftSideWrapp>
            {cart.map(i => (
              <CartItem
                key={i.product._id}
                product={i.product}
                currentColor={i.currentColor}
                currentSize={i.currentSize}
                cartQuantity={i.cartQuantity}
              />
            ))}
          </S.LeftSideWrapp>

          <S.RightSideWrapp>
            <S.Title>Shopping bag total</S.Title>
            <S.Discount>Add a discount code</S.Discount>
            <TextField id="standard-basic" variant="standard" />
            <S.Line />
            <S.OrderValue>Order value :</S.OrderValue>
            <S.Delivery>Delivery :</S.Delivery>

            <S.Total>
              Total price: <span className="total-price">{totalPrice} $ </span>
            </S.Total>

            <DefaultButton onClick={() => navigate("/address-details")}>Checkout</DefaultButton>
          </S.RightSideWrapp>
        </S.ShoppingCartWrapp>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}

export default ShoppingCart;
