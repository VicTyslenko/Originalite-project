import { closeModal } from "@main/store/slices/modal/modalSlice";
import { Container, Drawer } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import EmptyCart from "../../../../@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import * as S from "./StyledShoppingBag";
import { ShoppingBagItem } from "./extensions/ShoppingBagItem";

function ShoppingBag({ isShoppingBag }: { isShoppingBag: boolean }) {
  const dispatch = useStoreDispatch();

  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  const dataProducts = useStoreSelector(state => state.cart.data);
  const priceItem = dataProducts?.map(({ product, cartQuantity }) => product && product.currentPrice * cartQuantity);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //to prevent
    const button = event.currentTarget;
    button.blur();

    dispatch(closeModal());
    navigate("/shopping-cart");
  };
  useEffect(() => {
    if (priceItem) {
      setTotalPrice(priceItem.reduce((accum, item) => accum + item, 0));
    }
  }, [priceItem]);

  return (
    <>
      <Drawer
        anchor="right"
        open={isShoppingBag}
        onClose={() => {
          dispatch(closeModal());
        }}
      >
        <Container
          onClick={e => e.stopPropagation()}
          style={{
            overflow: "hidden",
            height: "100%",
          }}
        >
          <S.Title>Shopping Bag</S.Title>
          <S.WrappContainer>
            {dataProducts && dataProducts.length > 0 ? (
              <>
                <S.MainContent>
                  <ShoppingBagItem products={dataProducts} />
                </S.MainContent>

                <S.FooterContent>
                  <S.TotalPrice>
                    <span>Total : {totalPrice} $</span>
                  </S.TotalPrice>
                  <S.ButtonShoppingBag onClick={handleBasketClick}>Basket</S.ButtonShoppingBag>
                </S.FooterContent>
              </>
            ) : (
              <EmptyCart />
            )}
          </S.WrappContainer>
        </Container>
      </Drawer>
    </>
  );
}
export default ShoppingBag;
