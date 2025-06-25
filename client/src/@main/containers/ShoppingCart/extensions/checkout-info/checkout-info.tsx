import * as S from "./styles";

import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "services/api/axios";
import { DefaultButton } from "shared/components/typography/default-button/default-button";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { useShoppingCart } from "../../hooks";

export const CheckoutInfo = () => {
  const navigate = useNavigate();

  const cart = useStoreSelector(state => state.cart.products);
  console.log(cart);
  const { totalPrice, orderValue } = useShoppingCart();
  return (
    <S.Wrapper>
      <S.Title>Shopping bag total</S.Title>
      <Formik
        initialValues={{
          discount: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await publicInstance.post("/cart/discount", {
              discountCode: values.discount,
            });

            console.log(res);
          } catch (error) {
            console.error("error", error);
          }
          resetForm();
          console.log(values);
        }}
      >
        {props => (
          <S.Form onSubmit={props.handleSubmit}>
            <S.Label htmlFor="discount-code">Add a discount code</S.Label>

            <S.InputWrapp>
              <TextField
                id="discount-code"
                variant="standard"
                value={props.values.discount}
                onChange={props.handleChange}
                name="discount"
              />
              <DefaultButton type="submit">Apply</DefaultButton>
            </S.InputWrapp>
          </S.Form>
        )}
      </Formik>

      <S.Line />
      <S.OrderValue>Order value : {orderValue}</S.OrderValue>
      <S.Delivery>Delivery :</S.Delivery>

      <S.Total>
        Total price: <span className="total-price">{totalPrice} $ </span>
      </S.Total>
      <S.ButtonWrapp>
        <DefaultButton onClick={() => navigate("/address-details")}>Checkout</DefaultButton>
      </S.ButtonWrapp>
    </S.Wrapper>
  );
};
