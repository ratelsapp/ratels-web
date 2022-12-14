import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { MENU_TYPE } from "store/actions"; // THEME_RTL

const useStyles = makeStyles((theme) => ({
  navContainer: {
    width: "100%",
    minWidth: "200px",
    maxWidth: "280px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "250px",
    },
  },
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    border: "1px solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.colors.lightLevel2,
    background: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.colors.lightLevel2,
    color: theme.palette.primary.dark,
    transition: "all .2s ease-in-out",
    '&[aria-controls="menu-list-grow"],&:hover': {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main,
      color: theme.palette.primary.light,
    },
  },
  box: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
}));

const ThemeSection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    dispatch({
      type: MENU_TYPE,
      navType: theme.palette.mode === "dark" ? "light" : "dark",
    });
    // setTheme((prevOpen) => !prevOpen);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    setOpen(false);
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar
            variant="rounded"
            className={classes.headerAvatar}
            ref={anchorRef}
            onClick={handleToggle}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness4OutlinedIcon sx={{ fontSize: "1.3rem" }} />
            ) : (
              <Brightness4Icon sx={{ fontSize: "1.3rem" }} />
            )}
          </Avatar>
        </ButtonBase>
      </Box>
    </React.Fragment>
  );
};

export default ThemeSection;
