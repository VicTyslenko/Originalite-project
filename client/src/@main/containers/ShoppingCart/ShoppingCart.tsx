import { Container } from "@mui/system";
import { useCartData } from "hooks/use-cart-data";
import { useEffect } from "react";
import { SessionStorage } from "utils/session-storage";

import EmptyCart from "./EmptyCart/EmptyCart";
import * as S from "./StyledShoppingCart";
import { CartItem } from "./extensions/CartItem";
import { CheckoutInfo } from "./extensions/checkout-info/checkout-info";

function ShoppingCart() {
  const { cartData } = useCartData();

  useEffect(() => {
    if (cartData && cartData.length <= 0) {
      SessionStorage.removeDiscountToken();
      SessionStorage.removeActiveDiscount();
    }
  }, [cartData]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: "50px",
        marginTop: "40px",
      }}
    >
      {cartData && cartData.length > 0 ? (
        <S.ShoppingCartWrapp>
          <S.LeftSideWrapp>
            {cartData.map(i => (
              <CartItem
                key={i.product._id}
                product={i.product}
                currentColor={i.color}
                currentSize={i.size}
                cartQuantity={i.cartQuantity}
              />
            ))}
          </S.LeftSideWrapp>

          <CheckoutInfo />
        </S.ShoppingCartWrapp>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}

export default ShoppingCart;
