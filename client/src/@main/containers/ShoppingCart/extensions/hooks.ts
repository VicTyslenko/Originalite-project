import { addProductToCart } from "@main/store/actions/cart/cartActions";
import { decrementItemInCart, deleteProductFromCart } from "@main/store/actions/cart/cartActions";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useState } from "react";

export const useCartItem = () => {
  const dispatch = useStoreDispatch();

  const [selectedId, setSelectedId] = useState("");

  const [open, setOpen] = useState(false);
  const handleIncrement = (id: string) => {
    dispatch(addProductToCart(id));
  };

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };
  const hanleDecrement = (id: string) => {
    dispatch(decrementItemInCart(id));
  };

  const handleConfirm = (id: string) => {
    dispatch(deleteProductFromCart(id));
    setOpen(false);
  };

  return { handleConfirm, hanleDecrement, handleIncrement, handleOpenModal, open, selectedId, setOpen };
};
