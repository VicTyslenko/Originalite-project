import { getCategories } from "@main/store/actions/categoriesActions";
import { closeModal, openModal, toggleModal } from "@main/store/slices/modal/modalSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Container } from "@mui/material";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

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
  const dispatch = useStoreDispatch();

  const rootEl = useRef<HTMLDivElement | null>(null);

  const modal = useStoreSelector(state => state.modal.modal);

  const [dataMenu, setDataMenu] = useState<string>("");

  const handleDataSetEvent = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => {
    dispatch(toggleModal());

    const target = event.target as HTMLButtonElement;

    setDataMenu(target.dataset.menu || "");
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootEl.current || !rootEl.current.contains(e.target as Node)) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ContainerWrapper ref={rootEl}>
      <Container maxWidth="lg">
        <ContentWrapper>
          <div>
            <Link to="#">
              <ButtonItem data-menu="menuMen" onClick={handleDataSetEvent}>
                MAN
              </ButtonItem>
            </Link>
            <Link to="#">
              <ButtonItem data-menu="menuWomen" onClick={handleDataSetEvent}>
                WOMAN
              </ButtonItem>
            </Link>
            <Link to="#">
              <ButtonItem data-menu="menuAccessory" onClick={handleDataSetEvent}>
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
              onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                dispatch(toggleModal());
                const target = event.target as HTMLInputElement;
                setDataMenu(target.dataset.menu || "");
              }}
            >
              <SearchOutlinedIcon sx={{ mr: 0.4 }} fontSize="medium" />
              <ItemButton>Search</ItemButton>
            </ButtonGroup>

            <ButtonAuthorization handleDataSetEvent={handleDataSetEvent} />

            <ButtonGroup
              data-menu="shoppingBag"
              onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                dispatch(openModal());

                const target = event.target as HTMLInputElement;
                target.blur();
                setDataMenu(target.dataset.menu || "");
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
