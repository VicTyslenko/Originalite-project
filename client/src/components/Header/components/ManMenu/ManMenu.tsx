import { closeModal } from "@main/store/slices/modal/modalSlice";
import { Container } from "@mui/material";
import { useCategories } from "hooks/use-categories";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useCallback } from "react";
import type { Height } from "react-animate-height";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { setFilters } from "../../../../@main/store/slices/filter/filterSlice";
import { AnimateMenu, ContentWrap } from "../../StyledHeader";
import { Categories, StyledLink } from "./StyledMenMenu";

function ManMenu({ active }: { active: Height }) {
  const dispatch = useStoreDispatch();

  const { filteredCategories: manCategories } = useCategories("man");

  const filterCategories = useStoreSelector(state => state.filters.categories);

  const handleSetFilter = useCallback(
    (value: string) => {
      dispatch(
        setFilters({
          categories: value,
        }),
      );
      dispatch(closeModal());
    },

    [filterCategories],
  );

  const handleClearFilter = useCallback(() => {
    dispatch(setFilters({ categories: null }));

    dispatch(closeModal());
  }, [filterCategories]);

  return (
    <AnimateMenu id="example-panel" duration={700} height={active}>
      <Container maxWidth="lg">
        <ContentWrap>
          <Categories>Man</Categories>
          <StyledLink to="/store/man" onClick={() => handleClearFilter()}>
            View all
          </StyledLink>
          {manCategories &&
            manCategories.map(({ name, _id }) => (
              <StyledLink key={_id} to="/store/man" onClick={() => handleSetFilter(name)}>
                {name}
              </StyledLink>
            ))}
        </ContentWrap>
      </Container>
    </AnimateMenu>
  );
}

export default ManMenu;
