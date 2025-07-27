import { updateOrder } from "@main/store/actions/orders/ordersActions";
import { clearCart } from "@main/store/slices/cart/cartSlice";
import { clearOrderData } from "@main/store/slices/orders/ordersSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import { LoadingStatus } from "shared/models/modal.models";
import { SessionStorage } from "utils/session-storage";

import { deleteCart } from "../../../store/actions/cart/cartActions";
import type { SubmitPaymentProps } from "./models";

export const usePaymentPage = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const orderData = useStoreSelector(state => state.orders.data);
  const loadingStatus = useStoreSelector(state => state.orders.status);

  const { user } = useUserData();

  const handleCleanOrder = () => {
    dispatch(clearOrderData());
    SessionStorage.removeToken();
    SessionStorage.removeActiveDiscount();
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate("/");
  };

  // Submit form handler
  const handleSubmit = async ({ resetForm }: SubmitPaymentProps) => {
    try {
      if (orderData?.orderId) {
        const response = await dispatch(
          updateOrder({
            orderId: orderData.orderId,
            params: {
              email: user?.email || orderData.order.email,
              letterSubject: "Order Payment Confirmation",
              letterHtml: "<p>Your order has been successfully paid. Thank you for shopping with us!</p>",
              paymentStatus: "paid",
            },
          }),
        );

        if (response.meta.requestStatus === "fulfilled") {
          if (user) {
            dispatch(deleteCart());
          } else {
            dispatch(clearCart());
          }
        }

        handleCleanOrder();
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(
    function handleBodyScroll() {
      if (loadingStatus === LoadingStatus.loading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    },
    [loadingStatus],
  );

  return { modal, handleCloseModal, handleSubmit, loadingStatus };
};
