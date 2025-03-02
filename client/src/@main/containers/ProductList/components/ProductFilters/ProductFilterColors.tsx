import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { type Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import React, { useCallback, useEffect, useState } from "react";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { getColors } from "../../../../store/actions/colorsActions";
import { setFilters } from "../../../../store/slices/filter/filterSlice";
import { ColorIcon, FlexBox, ListItemIconColor } from "./ProductFilters.styles";

function ProductFilterColors() {
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const colorsList = useStoreSelector(state => state.colors.data);
  const filterColors = useStoreSelector(state => state.filters.colors);

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const handleSetFilter = useCallback(
    (color: string) => {
      if (filterColors && filterColors.includes(color)) {
        dispatch(
          setFilters({
            colors: filterColors.filter(el => el !== color),
          }),
        );
      } else {
        if (filterColors)
          dispatch(
            setFilters({
              colors: [...filterColors, color],
            }),
          );
      }
    },
    [dispatch, filterColors],
  );

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickMobile = () => {
    setOpenMobile(!openMobile);
  };

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <>
          <ListItemButton onClick={handleClickMobile}>
            <ListItemText primary="Colors" sx={{ textTransform: "uppercase" }} />
            {openMobile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMobile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {colorsList &&
                colorsList.map(({ _id: id, color, hash: backgroundColor }) => (
                  <ListItemButton
                    key={id}
                    onClick={() => handleSetFilter(color)}
                    selected={filterColors && filterColors.includes(color)}
                  >
                    <ListItemIconColor>
                      <ColorIcon sx={{ backgroundColor: { backgroundColor } }} />
                    </ListItemIconColor>
                    <ListItemText primary={color} />
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        </>
      ) : (
        <>
          <FlexBox onClick={handleClick}>
            <Typography variant="h4">Colors</Typography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </FlexBox>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              {colorsList &&
                colorsList.map(({ _id: id, color, hash: backgroundColor }) => (
                  <ListItemButton
                    key={id}
                    onClick={() => handleSetFilter(color)}
                    selected={filterColors && filterColors.includes(color)}
                  >
                    <ListItemIconColor>
                      <ColorIcon sx={{ backgroundColor: { backgroundColor } }} />
                    </ListItemIconColor>
                    <ListItemText secondary={color} />
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
}

export default ProductFilterColors;
