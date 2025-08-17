import { deleteProductFromCart } from "@main/store/actions/cart/cartActions";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { Link } from "react-router-dom";
import type { Products } from "shared/models/products.models";

import * as S from "../StyledShoppingBag";

type Props = {
  products: Products;
};

export const ShoppingBagItem = ({ products }: Props) => {
  const dispatch = useStoreDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return products.map(
    ({ product, cartQuantity }) =>
      product && (
        <S.ContentItem key={product._id}>
          <Link to={`product/${product.itemNo}`}>
            <S.ImageWrapp className="image-wrapp" onClick={handleCloseModal}>
              <img className="image" src={product.imageUrls[0]} alt="" />
            </S.ImageWrapp>
          </Link>
          <S.Description className="list">
            <div className="description">
              <S.NameItem>{product.name}</S.NameItem>
              <S.Price>
                Price : <span className="price">{product.currentPrice} $</span>
              </S.Price>
              <p>Qty: {cartQuantity}</p>
            </div>
            <S.RemoveIcon onClick={() => product._id && dispatch(deleteProductFromCart(product._id))}>
              <CloseIcon />
            </S.RemoveIcon>
          </S.Description>
        </S.ContentItem>
      ),
  );
};
