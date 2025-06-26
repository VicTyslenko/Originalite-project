import { useEffect, useState } from "react";
import { publicInstance } from "services/api/axios";

import type { InitialProps } from "./models";
import type { DiscountProps } from "./models";

export const useCheckInfo = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async (values: InitialProps, resetForm: () => void) => {
    console.log("Hello!");
    try {
      const res = await publicInstance.post("/cart/discount", {
        discountCode: values.discount,
      });

      if (res.status === 200) {
        const resultData = res.data.discountData as DiscountProps[];

        const discount = resultData.find(el => {
          return el.code.toLowerCase() === values.discount.toLowerCase();
        });
        console.log(discount?.value);
      }
    } catch (error) {
      console.error("error", error);
    }
    // resetForm();
  };

  return { handleSubmit };
};
