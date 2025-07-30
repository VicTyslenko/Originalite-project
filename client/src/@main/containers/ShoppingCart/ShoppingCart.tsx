import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Container } from "@mui/system";
import { useCartData } from "hooks/use-cart-data";
import { useEffect } from "react";
import { SessionStorage } from "utils/session-storage";

import { EmptyCart } from "./EmptyCart/EmptyCart";
import * as S from "./StyledShoppingCart";
import { CartItem } from "./extensions/CartItem";
import { CheckoutInfo } from "./extensions/checkout-info/checkout-info";

function ShoppingCart() {
  const { cartData, loadingCartData } = useCartData();

  useEffect(() => {
    if (cartData && cartData.length <= 0) {
      SessionStorage.removeDiscountToken();
      SessionStorage.removeActiveDiscount();
    }
  }, [cartData]);

  const cartContent = () => {
    switch (true) {
      case loadingCartData:
        return <EmptyCart description="Cart data is loading..." />;

      case cartData && cartData.length > 0:
        return (
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
        );
      default:
        return (
          <EmptyCart
            children={
              <ShoppingCartOutlinedIcon
                sx={{
                  height: "150px",
                  width: "200px",
                }}
              />
            }
          />
        );
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: "50px",
        marginTop: "40px",
      }}
    >
      {cartContent()}
    </Container>
  );
}

export default ShoppingCart;
