import * as S from "./styles";

import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "shared/components/typography/default-button/default-button";

import { useShoppingCart } from "../../hooks";
import { initialValues } from "./data";
import { useCheckInfo } from "./hooks";

export const CheckoutInfo = () => {
  const navigate = useNavigate();

  const { handleSubmit } = useCheckInfo();

  const { orderValue } = useShoppingCart();
  return (
    <S.Wrapper>
      <S.Title>Shopping bag total</S.Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
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
        Total price: <span className="total-price">{} $ </span>
      </S.Total>
      <S.ButtonWrapp>
        <DefaultButton onClick={() => navigate("/address-details")}>Checkout</DefaultButton>
      </S.ButtonWrapp>
    </S.Wrapper>
  );
};
