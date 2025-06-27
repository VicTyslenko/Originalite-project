import { useEffect, useMemo, useState } from "react";
import { getDiscount } from "services/api/cartApi";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import type { InitialProps } from "./models";
import type { DiscountProps } from "./models";

export const useCheckInfo = () => {
  const cart = useStoreSelector(state => state.cart.products);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const orderValue = useMemo(() => {
    return (
      cart?.reduce((sum, item) => {
        const itemPrice = item.product.currentPrice * item.cartQuantity;

        return sum + itemPrice;
      }, 0) ?? 0
    );
  }, [cart]);

  const [totalPrice, setTotalPrice] = useState(orderValue);

  useEffect(() => {
    setTotalPrice(orderValue);
  }, [orderValue]);

  // Submit discount code function
  const handleSubmit = async (values: InitialProps, resetForm: () => void) => {
    try {
      const res = await getDiscount({ discountCode: values.discount });

      if (res.status === 200) {
        const resultData = res.data.discountData as DiscountProps[];
        console.log(resultData);

        const validDiscountData = resultData.find(el => {
          let isNotExpired = new Date(el.expiresAt) > new Date();

          return el.isActive && isNotExpired ? el : null;
        });
        console.log(validDiscountData);

        // const searchedObject = resultData.find(el => el.code.toLocaleLowerCase() === values.discount.toLowerCase());

        // if (!searchedObject) return;

        // const { value } = searchedObject;

        // const discountValue = Math.ceil((orderValue * value) / 100);

        // const finalPrice = orderValue - discountValue;

        // setTotalPrice(finalPrice);
        setErrorMessage(null);
      }

      resetForm();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.error("error", error.response.data.message);
    }
  };

  return { handleSubmit, orderValue, totalPrice, cart, errorMessage };
};
