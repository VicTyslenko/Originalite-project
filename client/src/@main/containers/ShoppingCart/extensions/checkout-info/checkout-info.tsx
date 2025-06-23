import * as S from "./styles";

import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "shared/components/typography/default-button/default-button";

import { useShoppingCart } from "../../hooks";

export const CheckoutInfo = () => {
  const navigate = useNavigate();

  const { totalPrice, orderValue } = useShoppingCart();
  return (
    <S.Wrapper>
      <S.Title>Shopping bag total</S.Title>

      <S.Form>
        <S.Label htmlFor="discount-code">Add a discount code</S.Label>

        <S.InputWrapp>
          <TextField id="discount-code" variant="standard" />
          <DefaultButton type="submit">Apply</DefaultButton>
        </S.InputWrapp>
      </S.Form>

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
