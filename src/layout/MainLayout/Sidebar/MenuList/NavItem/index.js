import PropTypes from "prop-types";
import { useEffect, forwardRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import { Avatar, Chip, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, Grid } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { MENU_OPEN, SET_MENU } from "store/actions";
import { isFunction } from "lodash";
import { isDarkTheme } from "utils";

const useStyles = makeStyles((theme) => ({
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
    width: "6px",
    height: "6px",
  },
  listItem: {
    alignItems: "center",
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
}));

const NavItem = ({ item, level, setHoveringId, hoveringId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  useEffect(() => {
    const pathArr = history.location.pathname.split("/") || ["", ""];
    if (pathArr[1] === item.id) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
  }, [history.location.pathname]);

  const Icon = item.icon;

  const itemIcon = item.icon ? (
    <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
  ) : (
    <FiberManualRecordIcon
      className={
        customization.isOpen.findIndex((id) => id === item.id) > -1
          ? classes.listCustomIconSubActive
          : classes.listCustomIconSub
      }
      fontSize={level > 0 ? "inherit" : "default"}
    />
  );

  let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
  itemIconClass =
    customization.navType === "nav-dark" ? [itemIconClass, classes.listCustomIcon].join(" ") : itemIconClass;

  let itemTarget = "";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link {...props} to={`${item.url}${location.search || ""}`} />),
  };
  if (item.external) {
    listItemProps = { component: "a", href: `${item.url}` };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id: id });
    matchesSM && dispatch({ type: SET_MENU, opened: false });
  };

  const isActiveMenu = () => customization.isOpen.findIndex((id) => id === item.id) > -1;

  const isHover = item.id === hoveringId;

  const handleMouseEnter = () => {
    setHoveringId(item.id);
  };

  const handleMouseLeave = () => {
    setHoveringId(null);
  };

  return (
    <ListItem
      {...listItemProps}
      disabled={item.disabled}
      className={`${level > 1 ? classes.listItemNoBack : classes.listItem}
        sidebar`}
      sx={{ borderRadius: customization.borderRadius + "px" }}
      selected={isActiveMenu()}
      onClick={() => itemHandler(item.id)}
      button
      target={itemTarget}
      style={{ paddingLeft: level === 1 ? "19px" : "23px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          // <Typography variant={isActiveMenu() ? "h5" : "body1"} color={isHover || isActiveMenu() ? "textPrimary" : ""}>
          <Typography color={isHover || isActiveMenu() ? "textPrimary" : ""}>
            {isFunction(item.title)
              ? item.title({
                  theme,
                  isDarkTheme: isDarkTheme(theme),
                  isActiveMenu: isActiveMenu(),
                  isHover: isHover,
                })
              : item.title}
            {item.target === "_blank" ? (
              <ArrowForward
                fontSize="18px"
                sx={{
                  marginLeft: "2px",
                  transform: "rotate(-45deg)",
                }}
              />
            ) : null}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItem>
  );
};

export function SubNavItem({ item, level, setHoveringId, hoveringId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  useEffect(() => {
    const pathArr = history.location.pathname.split("/") || ["", ""];
    if (pathArr[1] === item.id) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
  }, [history.location.pathname]);

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
  ) : (
    <FiberManualRecordIcon
      className={
        customization.isOpen.findIndex((id) => id === item.id) > -1
          ? classes.listCustomIconSubActive
          : classes.listCustomIconSub
      }
      fontSize={level > 0 ? "inherit" : "default"}
    />
  );

  let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
  itemIconClass =
    customization.navType === "nav-dark" ? [itemIconClass, classes.listCustomIcon].join(" ") : itemIconClass;

  let itemTarget = "";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link {...props} to={`${item.url}${location.search || ""}`} />),
  };
  if (item.external) {
    listItemProps = { component: "a", href: `${item.url}` };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id: id });
    matchesSM && dispatch({ type: SET_MENU, opened: false });
  };

  const isActiveMenu = () => customization.isOpen.findIndex((id) => id === item.id) > -1;

  const isHover = item.id === hoveringId;

  const handleMouseEnter = () => {
    setHoveringId(item.id);
  };

  const handleMouseLeave = () => {
    setHoveringId(null);
  };

  return (
    <ListItem
      {...listItemProps}
      disabled={item.disabled}
      className={`${level > 1 ? classes.listItemNoBack : classes.listItem}
        sub`}
      selected={isActiveMenu()}
      onClick={() => itemHandler(item.id)}
      button
      target={itemTarget}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        background: "transparent",
      }}
    >
      <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          // <Typography variant={isActiveMenu() ? "h5" : "body1"} color={isHover || isActiveMenu() ? "textPrimary" : ""}>
          <Typography color={isHover || isActiveMenu() ? "textPrimary" : ""}>
            {isFunction(item.title)
              ? item.title({
                  theme,
                  isDarkTheme: isDarkTheme(theme),
                  isActiveMenu: isActiveMenu(),
                  isHover: isHover,
                })
              : item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItem>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
