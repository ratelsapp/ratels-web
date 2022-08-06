import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Chip, ButtonBase, Box } from "@mui/material";
import { t } from "@lingui/macro";

const useStyles = makeStyles((theme) => ({
  profileLabel: {
    lineHeight: 0,
    padding: "12px",
  },
  listItem: {
    wordBreak: "break-all",
    color: theme.palette.mode === "dark" ? theme.textDark : theme.lightDark,
    lineHeight: 1.2,
    padding: 0,
    marginBottom: "16px",
  },
  name: {
    marginLeft: "2px",
    fontWeight: 400,
  },
  box: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  profileRoot: {
    // background: theme.palette.mode === "dark" ? theme.themeOption.defaultGradient : theme.colors.lightPrimaryMain,
    background: theme.palette.mode === "dark" ? "transparent" : theme.colors.lightPrimaryMain,
    color: "#fff",
    borderRadius: "12px",
    border: "1px solid #4F5A84",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.themeOption.defaultGradient
          : `${theme.colors.lightPrimaryMain}!important`,
    },
  },
}));

const ProfileSection = () => {
  const classes = useStyles();
  const [openTestFaucetModal, setOpenTestFaucetModal] = useState(false);

  return (
    <>
      <Box component="span" className={classes.box}>
        <ButtonBase onClick={() => setOpenTestFaucetModal(true)} sx={{ borderRadius: "12px" }}>
          <Chip
            classes={{ root: classes.profileRoot, label: classes.profileLabel }}
            label={t`Test Faucet`}
            style={{ cursor: "pointer" }}
            variant="outlined"
            color="primary"
          />
        </ButtonBase>
      </Box>
    </>
  );
};

export default ProfileSection;
