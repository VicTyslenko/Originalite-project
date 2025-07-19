import { useCartData } from "hooks/use-cart-data";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDiscount } from "services/api/cartApi";
import { SessionStorage } from "utils/session-storage";

import type { DiscountProps, SubmitProps } from "./models";

export const useCheckInfo = () => {
  const [discount, setDiscount] = useState<number>(() => {
    return Number(SessionStorage.getDiscount()) || 0;
  });

  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const [isActivatedDiscount, setIsActivatedDiscount] = useState(false);

  const { orderValue } = useCartData();

  // Submit discount code function
  const handleSubmit = async ({ values, resetForm, setFieldError }: SubmitProps) => {
    try {
      const res = await getDiscount({ discountCode: values.discount });

      if (res.status === 200) {
        const resultData = res.data.discountData as DiscountProps[];

        const validDiscountData = resultData.find(el => {
          let isNotExpired = new Date(el.expiresAt) > new Date();

          return isNotExpired && el.isActive;
        });

        if (validDiscountData) {
          const { value } = validDiscountData;

          setDiscount(value);

          SessionStorage.setDiscount(String(value));
          setIsActivatedDiscount(true);

          toast.success("Discount code has applied!");
        }
      }

      resetForm();
    } catch (error: any) {
      setFieldError("discount", error.response.data.message);
      console.error("error", error.response.data.message);
    }
  };

  useEffect(() => {
    if (discount > 0) {
      const discountValue = (orderValue * discount) / 100;

      setDiscountPrice(() => {
        const result = Math.ceil(orderValue - discountValue);
        return result;
      });
    } else {
      setDiscountPrice(orderValue);
    }
  }, [isActivatedDiscount, orderValue, discount]);

  return { handleSubmit, discountPrice, isActivatedDiscount, discount };
};
