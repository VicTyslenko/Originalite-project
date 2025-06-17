import { deleteProductFromCart } from "@main/store/actions/cart/cartActions";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { addProductToCart, decrementItemInCart } from "../../store/actions/cart/cartActions";
import EmptyCart from "./EmptyCart/EmptyCart";
import PaymentModal from "./Modal/PaymentModal";
import {
  Content,
  ContentWrapp,
  LeftSideWrapp,
  RemoveButton,
  RightSideWrapp,
  ShoppingCartWrapp,
  StyledDiv,
  StyledLink,
} from "./StyledShoppingCart";
import { CartItem } from "./extensions/cart-item";

function ShoppingCart() {
  const dispatch = useStoreDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useStoreSelector(state => state.cart.products);

  const [selectedId, setSelectedId] = useState("");

  const [open, setOpen] = useState(false);

  const priceItem = cart?.map(({ product, cartQuantity }) => product.currentPrice * cartQuantity);

  useEffect(() => {
    if (priceItem) {
      setTotalPrice(priceItem.reduce((a, b) => a + b, 0));
    }
  }, [priceItem]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginBottom: "50px",
        marginTop: "40px",
      }}
    >
      {cart && cart.length > 0 ? (
        <ShoppingCartWrapp>
          <LeftSideWrapp>
            {cart.map(i => (
              <CartItem
                product={i.product}
                currentColor={i.currentColor}
                currentSize={i.currentSize}
                cartQuantity={i.cartQuantity}
              />
            ))}
          </LeftSideWrapp>

          <RightSideWrapp>
            <h1 className="title">Shopping bag total</h1>
            <p className="discount">Add a discount code</p>
            <TextField id="standard-basic" variant="standard" />
            <hr className="line" />
            <p className="order">Order value :</p>
            <p className="delivery">Delivery :</p>
            <p className="total">
              Total price: <span className="total-price">{totalPrice} $ </span>{" "}
            </p>
            <div className="button-wrapp">
              <StyledLink to={"/address-details"}>Checkout</StyledLink>
            </div>
          </RightSideWrapp>
        </ShoppingCartWrapp>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
}

export default ShoppingCart;
