import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useState } from "react";

import { addProductToCart, decrementItemInCart, deleteProductFromCart } from "../../store/actions/cart/cartActions";

export const useShoppingCart = () => {
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
