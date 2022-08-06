import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { makeStyles, useTheme } from "@mui/styles";
import { Box, Divider, Drawer, useMediaQuery, Grid } from "@mui/material";
import MenuList from "./MenuList";
import MenuMediaList from "./MenuList/MenuMediaList";
import LogoSection from "../LogoSection";
import UserCounter from "./UserCounter";

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: (props) => props.drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    background: theme.palette.background.default,
    color: theme.palette.mode === "dark" ? theme.textDark : theme.lightDark,
    borderRight: "none",
    [theme.breakpoints.up("md")]: {
      top: "88px",
      height: "calc(100vh - 88px)",
    },
  },
  ScrollHeight: {
    height: "calc(100vh - 88px)",
    paddingLeft: "16px",
    paddingRight: "16px",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 56px)",
    },
  },
  boxContainer: {
    display: "flex",
    padding: "16px",
    marginLeft: "auto",
    marginRight: "auto",
    position: "reletive",
  },
  divider: {
    marginTop: "auto",
  },
  SidebarBox: {
    padding: "0 18px",
    flexWrap: "nowrap",
    height: "100%",
  },
}));

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const { drawerWidth } = useSelector((state) => state.global);
  const classes = useStyles({ drawerWidth });
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <React.Fragment>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <div className={classes.boxContainer}>
          <LogoSection />
        </div>
      </Box>
      <Grid className={classes.SidebarBox} container direction="column" justify="center" alignItems="center">
        <MenuList />
        <Divider className={classes.divider} />
        <MenuMediaList />
        <UserCounter />
      </Grid>
    </React.Fragment>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
