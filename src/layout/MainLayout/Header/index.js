import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  ButtonBase,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LogoSection from "../LogoSection";
import MobileSection from "./MobileSection";
import ProfileSection from "./ProfileSection";
import PriceSection from "./PriceSection";
import { IconMenu2 } from "@tabler/icons";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  headerAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: "all .2s ease-in-out",
    background:
      theme.palette.mode === "dark"
        ? theme.palette.dark.main
        : theme.palette.secondary.light,
    color:
      theme.palette.mode === "dark"
        ? theme.palette.secondary.main
        : theme.palette.secondary.dark,
    "&:hover": {
      background:
        theme.palette.mode === "dark"
          ? theme.palette.secondary.main
          : theme.palette.secondary.dark,
      color:
        theme.palette.mode === "dark"
          ? theme.palette.secondary.light
          : theme.palette.secondary.light,
    },
  },
  logo: {
    width: "228px",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
  },
}));

const Header = ({ handleLeftDrawerToggle }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container>
      <div className={classes.logo}>
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            className={classes.headerAvatar}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </div>
      <Grid
        item
        xs
        flexWrap="wrap"
        sx={{
          whiteSpace: "nowrap",
          overflow: "auto",
          textAlign: "right",
        }}
      >
        <ProfileSection />
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
