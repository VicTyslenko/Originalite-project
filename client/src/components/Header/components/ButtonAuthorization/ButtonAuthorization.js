import { isAuthSelector } from "@main/store/selectors/authSelector";
import { isRegistrationSelector } from "@main/store/selectors/registrationSelector";
import { toggleModal } from "@main/store/slices/modalSlice";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ButtonGroup, ItemButton, LinkItem } from "components/Header/StyledHeader";
import { useDispatch, useSelector } from "react-redux";

export const ButtonAuthorization = ({ setDataMenu }) => {
	const isAuth = useSelector(isAuthSelector);
	const isRegistration = useSelector(isRegistrationSelector);

	const dispatch = useDispatch();
	if (isAuth || isRegistration) {
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
			aria-controls="example-panel"
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
