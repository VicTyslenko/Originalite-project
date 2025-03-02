import { deleteProductFromCart } from "@main/store/actions/cart/cartActions";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import * as S from "../StyledShoppingBag";

export const ShoppingBagItem = ({ products }) => {
	const dispatch = useDispatch();

	return products.map(
		({ product }) =>
			product && (
				<S.ContentItem key={product._id}>
					<Link to={`product/${product.itemNo}`}>
						<S.ImageWrapp className="image-wrapp">
							<img className="image" src={product.imageUrls[0]} alt="" />
						</S.ImageWrapp>
					</Link>
					<S.Description className="list">
						<div className="description">
							<S.NameItem>{product.name}</S.NameItem>
							<S.Price>
								Price : <span className="price">{product.currentPrice} $</span>
							</S.Price>
						</div>
						<S.RemoveIcon
							onClick={e => {
								dispatch(deleteProductFromCart(product._id));
							}}
						>
							<CloseIcon />
						</S.RemoveIcon>
					</S.Description>
				</S.ContentItem>
			),
	);
};
