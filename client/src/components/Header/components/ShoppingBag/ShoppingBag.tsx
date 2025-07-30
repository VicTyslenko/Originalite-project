import { EmptyCart } from "@main/containers/ShoppingCart/EmptyCart/EmptyCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Container, Drawer } from "@mui/material";

import * as S from "./StyledShoppingBag";
import { ShoppingBagItem } from "./extensions/ShoppingBagItem";
import { useShoppingBag } from "./hooks";
import type { ShoppingBagProps } from "./models";

function ShoppingBag({ isShoppingBag }: ShoppingBagProps) {
  const { dataProducts, orderValue, handleModalClose, handleBasketClick } = useShoppingBag({
    isShoppingBag,
  });

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
                    <span>Total :{orderValue} $</span>
                  </S.TotalPrice>
                  <S.ButtonShoppingBag onClick={handleBasketClick}>Basket</S.ButtonShoppingBag>
                </S.FooterContent>
              </>
            ) : (
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
            )}
          </S.WrappContainer>
        </Container>
      </Drawer>
    </>
  );
}
export default ShoppingBag;
