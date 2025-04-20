import { updateOrder } from "@main/store/actions/orders/ordersActions";
import { clearCart } from "@main/store/slices/cart/cartSlice";
import { clearOrderData } from "@main/store/slices/orders/ordersSlice";
import { MenuItem, Select, TextField, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { deleteCart } from "../../../store/actions/cart/cartActions";
import PaymentModal from "../Modal/PaymentModal";
import SVG from "../SVG/SVG";
import SVGMaestro from "../SVG/SVGMaestro";
import SVGPayPall from "../SVG/SVGPayPall";
import { CardsWrapper, PaymentWrapper, StyledButton, Title } from "./StyledPaymentPage";
import { monthOptions, yearOptions } from "./data";
import type { InitialProps, SubmitPaymentProps } from "./models";
import { validationSchema } from "./validation";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const user = useUserData();

  const order = useStoreSelector(state => state.orders.data);

  const dispatch = useStoreDispatch();

  const handleSubmit = async ({ values, resetForm }: SubmitPaymentProps) => {
    if (user) {
      dispatch(deleteCart());
    } else {
      dispatch(clearCart());
    }

    if (order?.orderId) {
      const response = await dispatch(
        updateOrder({
          orderId: order.orderId,
          params: {
            email: user?.email,
            letterSubject: "Order Payment Confirmation",
            letterHtml: "<p>Your order has been successfully paid. Thank you for shopping with us!</p>",
            paymentStatus: "paid",
          },
        }),
      );

      if (response.meta.requestStatus === "fulfilled") {
        dispatch(clearOrderData());
      }
    }

    setModal(true);
    resetForm();
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PaymentWrapper>
        <Title>Please select your payment method</Title>
        <p className="total-payment">Total payment amount</p>
        <CardsWrapper>
          <SVG />
          <SVGPayPall />
          <SVGMaestro />
        </CardsWrapper>

        <Formik<InitialProps>
          initialValues={{
            card: "",
            cardName: "",
            month: "1",
            year: "2025",
            cvv: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <div className="flex-block">
                <span className="info">Card number</span>
                <TextField
                  variant="standard"
                  value={props.values.card}
                  onChange={props.handleChange}
                  name="card"
                  error={props.touched.card && Boolean(props.errors.card)}
                  helperText={props.errors.card}
                />
              </div>

              <div className="flex-block">
                <span className="info">Card holder name</span>
                <TextField
                  variant="standard"
                  value={props.values.cardName}
                  onChange={props.handleChange}
                  name="cardName"
                  error={props.touched.cardName && Boolean(props.errors.cardName)}
                  helperText={props.errors.cardName}
                />
              </div>

              <div className="flex-select">
                <span className="info"> Card Expiry Date </span>
                <Select value={props.values.month} name="month" onChange={props.handleChange}>
                  {monthOptions.map(month => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>{" "}
                /
                <Select value={props.values.year} onChange={props.handleChange} name="year">
                  {yearOptions.map(year => (
                    <MenuItem key={year.value} value={year.value}>
                      {year.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="cvv">
                <span className="info">CVC/CVV/CID </span>
                <TextField
                  variant="standard"
                  sx={{
                    width: "50px",
                    paddingRight: "60px",
                  }}
                  value={props.values.cvv}
                  name="cvv"
                  onChange={props.handleChange}
                  error={props.touched.cvv && Boolean(props.errors.cvv)}
                  helperText={props.errors.cvv}
                />

                <Tooltip
                  title="CVV (Card Verification Value) is a 3 or 4-digit security code on your credit or debit card used to verify your identity during online or phone transactions."
                  placement="top"
                >
                  <span className="tooltip-cvv">cvv</span>
                </Tooltip>
              </div>
              <StyledButton type="submit">Pay</StyledButton>
            </form>
          )}
        </Formik>

        {modal && (
          <PaymentModal
            open={modal}
            close={handleCloseModal}
            text="Thank you for choosing our shop!"
            confirm={handleCloseModal}
            customStyles={{
              minWidth: "520px",
            }}
          />
        )}
      </PaymentWrapper>
    </Container>
  );
};

export default PaymentPage;
