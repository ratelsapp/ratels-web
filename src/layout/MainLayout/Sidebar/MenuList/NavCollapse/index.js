import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import NavItem from "./../NavItem";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

const useStyles = makeStyles((theme) => ({
  collapseIcon: {
    fontSize: "1rem",
    marginTop: "auto",
    marginBottom: "auto",
  },
  collapseIconSub: {
    fontSize: "1rem",
    marginTop: "auto",
    marginBottom: "auto",
  },
  menuIcon: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  listIcon: {
    minWidth: "18px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  listCustomIconSub: {
    width: "6px",
    height: "6px",
  },
  listCustomIconSubActive: {
    // width: "8px",
    // height: "8px",
  },
  listItem: {
    marginBottom: "5px",
    alignItems: "flex-start",
  },
  listItemNoBack: {
    marginBottom: "5px",
    backgroundColor: "transparent !important",
    paddingTop: "8px",
    paddingBottom: "8px",
    alignItems: "flex-start",
  },
  subMenuCaption: {
    ...theme.typography.subMenuCaption,
  },
  collapseWrapper: {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      left: "32px",
      top: 0,
      height: "100%",
      width: "1px",
      opacity: theme.palette.mode === "dark" ? 0.2 : 1,
      background: theme.palette.mode === "dark" ? theme.palette.dark.light : theme.palette.primary.light,
    },
  },
}));

const NavCollapse = ({ menu, level }) => {
  const classes = useStyles();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  // menu collapse & item
  const menus = menu.children.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
  ) : (
    <FiberManualRecordIcon
      className={selected === menu.id ? classes.listCustomIconSubActive : classes.listCustomIconSub}
      fontSize={level > 0 ? "inherit" : "default"}
    />
  );

  let menuIconClass = !menu.icon ? classes.listIcon : classes.menuIcon;

  return (
    <React.Fragment>
      <ListItem
        className={level > 1 ? classes.listItemNoBack : classes.listItem}
        sx={{ borderRadius: customization.borderRadius + "px" }}
        selected={selected === menu.id}
        button
        onClick={handleClick}
        style={{ paddingLeft: level * 23 + "px" }}
      >
        <ListItemIcon className={menuIconClass}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant={selected === menu.id ? "h5" : "body1"} color="inherit">
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            className={level > 1 ? classes.collapseIconSub : classes.collapseIcon}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            className={level > 1 ? classes.collapseIconSub : classes.collapseIcon}
          />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.collapseWrapper}>
          {menus}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};

export default NavCollapse;
