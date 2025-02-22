import { toggleModal } from "@main/store/slices/modal/modalSlice";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ButtonGroup, ItemButton, LinkItem } from "components/Header/StyledHeader";
import { useUserData } from "hooks/use-user-data";
import { useDispatch } from "react-redux";

export const ButtonAuthorization = ({ setDataMenu }) => {
	const user = useUserData();

	const dispatch = useDispatch();

	if (user) {
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
