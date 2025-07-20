import { useCartData } from "hooks/use-cart-data";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDiscount } from "services/api/cartApi";
import { SessionStorage } from "utils/session-storage";

import type { DiscountProps, SubmitProps } from "./models";

export const useCheckInfo = () => {
  const [token, setToken] = useState<string>(() => {
    return SessionStorage.getDiscountToken() || "";
  });

  const [expErrorMessage, setExpErrorMessage] = useState("");

  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const { orderValue } = useCartData();

  // Submit discount code function
  const handleSubmit = async ({ values, resetForm, setFieldError }: SubmitProps) => {
    try {
      const res = await getDiscount({ discountCode: values.discount });

      if (res.status === 200) {
        const token = res.data.validDiscountData;

        setToken(token);
        SessionStorage.setDiscountToken(token);
        toast.success("Discount code applied!");
        setExpErrorMessage("");
      }

      resetForm();
    } catch (error: any) {
      setFieldError("discount", error.response.data.message);
      console.error("error", error.response.data.message);
    }
  };
  // Setting the total price regarding discount value. If discount is not applied, set to order value

  useEffect(() => {
    if (!token) {
      setDiscountPrice(orderValue);
    } else {
      const discountData = jwtDecode(token) as DiscountProps;
      const { exp, value: discount } = discountData;

      const currentDate = Date.now() / 1000;

      const validToken = currentDate < Number(exp);

      if (discount > 0 && validToken) {
        const discountValue = (orderValue * discount) / 100;

        setDiscountPrice(() => {
          const result = Math.ceil(orderValue - discountValue);
          return result;
        });
      } else {
        setToken("");
        setExpErrorMessage("Discount code has expired, try again");
        SessionStorage.removeToken();
      }
    }
  }, [orderValue, token]);

  return { handleSubmit, discountPrice, token, expErrorMessage };
};
