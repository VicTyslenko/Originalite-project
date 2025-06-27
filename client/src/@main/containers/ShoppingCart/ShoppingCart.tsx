import { Container } from "@mui/system";

import EmptyCart from "./EmptyCart/EmptyCart";
import * as S from "./StyledShoppingCart";
import { CartItem } from "./extensions/CartItem";
import { CheckoutInfo } from "./extensions/checkout-info/checkout-info";
import { useCheckInfo } from "./extensions/checkout-info/hooks";

function ShoppingCart() {
  const { cart } = useCheckInfo();

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

          <CheckoutInfo />
        </S.ShoppingCartWrapp>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}

export default ShoppingCart;
