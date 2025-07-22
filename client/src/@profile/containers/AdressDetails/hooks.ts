import type { SubmitProps } from "@main/store/actions/orders/models";
import { ordersFetchData } from "@main/store/actions/orders/ordersActions";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useUserData } from "hooks/use-user-data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

export const useAddressDetails = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const order = useStoreSelector(state => state.orders.data);
  const totalSum = useStoreSelector(state => state.cart.totalSum);
  const products = useStoreSelector(state => state.cart.products);
  const serverError = useStoreSelector(state => state.orders.error);

  const { user } = useUserData();

  // submit form handler
  const handleFormSubmit = async ({ values, resetForm }: SubmitProps) => {
    if (!products?.length) return;
    
    const data = await dispatch(
      ordersFetchData({ ...values, customerId: user?.id || null, products, orderId: order?.orderId!, totalSum }),
    );

    if (data.meta.requestStatus === "rejected") return;

    toast.success("Address saved!");
    navigate("/payment");
    resetForm();
  };

  return { handleFormSubmit, serverError, user };
};
