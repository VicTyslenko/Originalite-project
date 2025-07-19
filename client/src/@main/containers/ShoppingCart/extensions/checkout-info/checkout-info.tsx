import * as S from "./styles";

import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { useCartData } from "hooks/use-cart-data";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "shared/components/typography/default-button/default-button";

import { initialValues } from "./data";
import { useCheckInfo } from "./hooks";

export const CheckoutInfo = () => {
  const navigate = useNavigate();

  const { orderValue } = useCartData();

  const { handleSubmit, discountPrice, discount } = useCheckInfo();

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

      <S.Total isActive={discount > 0}>
        {discount > 0 ? "Discount" : "Total"} price
        <span className="total-price">{discountPrice} $ </span>
      </S.Total>
      <S.ButtonWrapp>
        <DefaultButton onClick={() => navigate("/address-details")}>Checkout</DefaultButton>
      </S.ButtonWrapp>
    </S.Wrapper>
  );
};
