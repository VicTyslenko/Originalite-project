import { setTotalSum } from "@main/store/slices/cart/cartSlice";
import { useCartData } from "hooks/use-cart-data";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getDiscount } from "services/api/cartApi";
import { SessionStorage } from "utils/session-storage";

import type { DiscountProps, SubmitProps } from "./models";

export const useCheckoutInfo = () => {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();

  const [token, setToken] = useState<string | null>(() => {
    return SessionStorage.getDiscountToken() || null;
  });

  const [discountIsActivated, setDiscountIsActivated] = useState(() => {
    return SessionStorage.getActivateDiscount() === "true" || false;
  });

  const [expErrorMessage, setExpErrorMessage] = useState("");
  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const { orderValue } = useCartData();

  useEffect(() => {
    if (!discountIsActivated) {
      setExpErrorMessage("");
    }
  }, [discountIsActivated]);

  // Submit discount code function
  const handleSubmit = async ({ values, resetForm, setFieldError }: SubmitProps) => {
    if (discountIsActivated) {
      setFieldError("discount", "The code has been already applied!");
      return;
    }
    // if input value is empty, the request will not be sent
    if (values.discount.trim() === "") {
      setFieldError("discount", "please, provide the discount code!");
      return;
    }

    try {
      // get response from backend/ validated discount data
      const res = await getDiscount({ discountCode: values.discount });
      if (res.status === 200) {
        const validToken = res.data.validDiscountData;
        setToken(validToken);
        // set token to session storage for next calculation after page is reload
        SessionStorage.setDiscountToken(validToken);
        toast.success("Discount code applied!");
        setExpErrorMessage("");
        setDiscountIsActivated(true);
        SessionStorage.setActivateDiscount("true");
      }
      resetForm();
    } catch (error: any) {
      setFieldError("discount", error.response.data.message);
      console.error("error", error);
    }
  };
  const handleCheckout = () => {
    navigate("/address-details");
    dispatch(setTotalSum(discountPrice));
  };

  // Setting the total price regarding discount value(which is taken from token/ session storage). If discount is not applied, set to order value

  useEffect(() => {
    if (!token) {
      setDiscountPrice(orderValue);
    } else {
      const discountData = jwtDecode(token) as DiscountProps;

      const { exp, value: discountValue } = discountData;

      const currentDate = Date.now() / 1000;
      const validToken = currentDate < Number(exp);

      if (discountValue > 0 && validToken) {
        const calculatedDiscountValue = (orderValue * discountValue) / 100;

        setDiscountPrice(() => {
          const result = Math.ceil(orderValue - calculatedDiscountValue);
          return result;
        });
      } else {
        setToken("");
        setExpErrorMessage("Discount code has expired, try again");
        SessionStorage.removeToken();
      }
    }
  }, [orderValue, token]);

  return { handleSubmit, discountPrice, token, expErrorMessage, handleCheckout, discountIsActivated };
};
