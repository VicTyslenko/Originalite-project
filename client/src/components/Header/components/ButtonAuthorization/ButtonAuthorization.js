import { toggleModal } from "@main/store/slices/modalSlice";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ButtonGroup, ItemButton, LinkItem } from "components/Header/StyledHeader";
import { useDispatch, useSelector } from "react-redux";

export const ButtonAuthorization = ({ setDataMenu }) => {
	const isAuth = useSelector(state => state.auth.data);

	const isTempAuth = useSelector(state => state.tempAuth.tempData);

	const dispatch = useDispatch();

	if (isAuth || isTempAuth) {
		return (
			<ButtonGroup>
				<PermIdentityOutlinedIcon sx={{ mr: 0.8 }} fontSize="medium" />
				<LinkItem to="/account/profile">My account</LinkItem>
			</ButtonGroup>
		);
	}

	return (
		<ButtonGroup
			data-menu="menuRegistration"
			onClick={e => {
				dispatch(toggleModal());
				setDataMenu(e.target.dataset.menu);
			}}
		>
			<PermIdentityOutlinedIcon sx={{ mr: 0.4 }} fontSize="medium" />
			<ItemButton>Sign Up / Log In</ItemButton>
		</ButtonGroup>
	);
};
