import { Link } from "react-router-dom";
import type { ProductData } from "shared/models/products.models";

import PaymentModal from "../Modal/PaymentModal";
import { Content, ContentWrapp, RemoveButton, StyledDiv } from "../StyledShoppingCart";
import { useCartItem } from "./hooks";

type Props = {
  product: ProductData | null;
  currentColor: string;
  currentSize: string;
  cartQuantity: number;
};

export const CartItem = ({ product, currentColor, currentSize, cartQuantity }: Props) => {
  const { open, handleConfirm, hanleDecrement, handleIncrement, handleOpenModal, selectedId, setOpen } = useCartItem();

  return (
    <ContentWrapp>
      <Content>
        <div className="image-wrapp">
          <Link to={`/product/${product?.itemNo}`}>
            <img className="image" src={product?.imageUrls[0]} alt="" />
          </Link>
        </div>
        <StyledDiv>
          <ul className="list">
            <li className="title">{product?.name}</li>
            <li className="color">Color : {currentColor}</li>
            <li className="size">Size : {currentSize}</li>
            <div className="btn-wrapp">
              <button className="btn-qnt" onClick={() => product?._id && hanleDecrement(product._id)}>
                -
              </button>
              {cartQuantity}
              <button className="btn-qnt" onClick={() => product?._id && handleIncrement(product._id)}>
                +
              </button>
            </div>

            <li className="price">Price : {product?.currentPrice} $ </li>
            <li className="total">Total : {product?.currentPrice ? product.currentPrice * cartQuantity : 0} $</li>
          </ul>
          {product && <RemoveButton onClick={() => handleOpenModal(product._id)}>Remove</RemoveButton>}
        </StyledDiv>
      </Content>
      {open && (
        <PaymentModal
          open={open}
          close={() => setOpen(false)}
          text="Do you want to remove this item?"
          actions
          cancel={() => setOpen(false)}
          customStyles={{
            minWidth: "450px",
          }}
          confirm={() => {
            handleConfirm(selectedId);
          }}
          confirmText="Remove item"
          cancelText="No, keep it"
        />
      )}
    </ContentWrapp>
  );
};
