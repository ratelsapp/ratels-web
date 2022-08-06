import { useState } from "react";
import { Typography } from "@mui/material";
import NavGroup from "./NavGroup";
import Menus from "../Menus";
import NavItem from "./NavItem";

const MenuList = () => {
  const [hoveringId, setHoveringId] = useState(null);

  const navItems = Menus.items.map((item) => {
    switch (item.type) {
      case "item":
        return <NavItem key={item.id} item={item} level={1} hoveringId={hoveringId} setHoveringId={setHoveringId} />;
      case "group":
        return <NavGroup key={item.id} item={item} hoveringId={hoveringId} setHoveringId={setHoveringId} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
