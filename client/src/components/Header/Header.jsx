import { getCategories } from "@main/store/actions/categoriesActions";
import { closeModal, openModal, toggleModal } from "@main/store/slices/modalSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
	BoxTechnical,
	ButtonGroup,
	ButtonItem,
	ContainerWrapper,
	ContentWrapper,
	ItemButton,
	Logo,
} from "./StyledHeader";
import Accessory from "./components/Accessory";
import { ButtonAuthorization } from "./components/ButtonAuthorization";
import DropdownRegister from "./components/DropdownRegister";
import ManMenu from "./components/ManMenu";
import Search from "./components/Search";
import ShoppingBag from "./components/ShoppingBag";
import WomanMenu from "./components/WomenMenu";

function Header() {
	const isRegistration = useSelector(state => Boolean(state.registration.data));

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const rootEl = useRef(null);

	const modal = useSelector(state => state.modal.modal);

	const [dataMenu, setDataMenu] = useState(null);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		const onClick = e => rootEl.current.contains(e.target) || dispatch(closeModal());

		document.addEventListener("click", onClick);

		return () => document.removeEventListener("click", onClick);
	}, []);

	useEffect(() => {
		if (isRegistration) {
			navigate("/");
		}

		window.scrollTo(0, 0);
	}, [isRegistration]);

	return (
		<ContainerWrapper ref={rootEl}>
			<Container maxWidth="lg">
				<ContentWrapper>
					<div>
						<Link to="#">
							<ButtonItem
								data-menu="menuMen"
								onClick={e => {
									dispatch(toggleModal());
									setDataMenu(e.target.dataset.menu);
								}}
							>
								MAN
							</ButtonItem>
						</Link>
						<Link to="#">
							<ButtonItem
								data-menu="menuWomen"
								onClick={e => {
									dispatch(toggleModal());
									setDataMenu(e.target.dataset.menu);
								}}
							>
								WOMAN
							</ButtonItem>
						</Link>
						<Link to="#">
							<ButtonItem
								data-menu="menuAccessory"
								onClick={e => {
									dispatch(toggleModal());
									setDataMenu(e.target.dataset.menu);
								}}
							>
								ACCESSORY
							</ButtonItem>
						</Link>
					</div>

					<div>
						<Logo to="/">Originalité</Logo>
					</div>

					<BoxTechnical>
						<ButtonGroup
							data-menu="menuSearch"
							onClick={e => {
								dispatch(toggleModal());
								setDataMenu(e.target.dataset.menu);
							}}
						>
							<SearchOutlinedIcon sx={{ mr: 0.4 }} fontSize="medium" />
							<ItemButton>Search</ItemButton>
						</ButtonGroup>

						<ButtonAuthorization setDataMenu={setDataMenu} />

						<ButtonGroup
							data-menu="shoppingBag"
							onClick={e => {
								e.target.blur();
								dispatch(openModal());
								setDataMenu(e.target.dataset.menu);
							}}
						>
							<ShoppingBagOutlinedIcon sx={{ mr: 0.4 }} fontSize="medium" />
							<ItemButton>Shopping Bag</ItemButton>
						</ButtonGroup>
					</BoxTechnical>

					<DropdownRegister active={modal && dataMenu === "menuRegistration" ? "auto" : 0} />
				</ContentWrapper>

				<ManMenu active={modal && dataMenu === "menuMen" ? "auto" : 0} />
				<WomanMenu active={modal && dataMenu === "menuWomen" ? "auto" : 0} />
				<Accessory active={modal && dataMenu === "menuAccessory" ? "auto" : 0} />
				<Search active={modal && dataMenu === "menuSearch" ? "auto" : 0} />
				<ShoppingBag isShoppingBag={modal && dataMenu === "shoppingBag"} />
			</Container>
		</ContainerWrapper>
	);
}

export default Header;
