import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/styles";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { secondaryMainCardPadding } from "../../constants/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  content: (theme) => ({
    backgroundColor: "#030F09",
    width: "100%",
    minHeight: "calc(100vh)",
    flexGrow: 1,
    borderRadius: theme.customization.borderRadius + "px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
      padding: "0px",
    },
  }),
  secondaryMainCard: {
    paddingBottom: `${secondaryMainCardPadding * 8}px!important`,
  },
});

const MainLayout = ({ children }) => {
  const { drawerWidth } = useSelector((state) => state.global);
  const theme = useTheme();
  const classes = useStyles({ ...theme, drawerWidth });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
