import { Container, Drawer } from "@mui/material";

import EmptyCart from "../../../../@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import * as S from "./StyledShoppingBag";
import { ShoppingBagItem } from "./extensions/ShoppingBagItem";
import { useShoppingBag } from "./hooks";
import type { ShoppingBagProps } from "./models";

function ShoppingBag({ isShoppingBag }: ShoppingBagProps) {
  const { dataProducts, handleModalClose, totalPrice, handleBasketClick } = useShoppingBag({ isShoppingBag });
  return (
    <>
      <Drawer anchor="right" open={isShoppingBag} onClose={handleModalClose}>
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
