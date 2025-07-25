import * as S from "./styles";

import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useCartData } from "hooks/use-cart-data";
import { DefaultButton } from "shared/components/typography/default-button/default-button";

import { initialValues } from "./data";
import { useCheckInfo } from "./hooks";

export const CheckoutInfo = () => {
  const { orderValue } = useCartData();

  const { handleSubmit, discountPrice, token, expErrorMessage, handleCheckout } = useCheckInfo();

  return (
    <S.Wrapper>
      <S.Title>Shopping bag total</S.Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm, setFieldError }) => {
          handleSubmit({ values, resetForm, setFieldError });
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
                error={props.touched.discount && Boolean(props.errors.discount)}
                name="discount"
              />
              <DefaultButton type="submit">Apply</DefaultButton>
            </S.InputWrapp>

            {props.errors.discount && <S.ErrorMessage>{props.errors.discount}</S.ErrorMessage>}
          </S.Form>
        )}
      </Formik>

      <S.Line />
      <S.OrderValue>Order value : {orderValue}</S.OrderValue>
      {/* <S.Delivery>Delivery :</S.Delivery> */}
      {expErrorMessage && <S.ErrorMessage>{expErrorMessage}</S.ErrorMessage>}
      <S.Total isActive={Boolean(token)}>
        {Boolean(token) ? "Discount" : "Total"} price
        <span className="total-price">{discountPrice} $ </span>
      </S.Total>
      <S.ButtonWrapp>
        <DefaultButton onClick={handleCheckout}>Checkout</DefaultButton>
      </S.ButtonWrapp>
    </S.Wrapper>
  );
};
