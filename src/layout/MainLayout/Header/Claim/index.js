import React from "react";
import { makeStyles } from "@mui/styles";
import { Chip, Box, ButtonBase } from "@mui/material";
import { ICS_TOKEN_INFO } from "constants/ics-token";
import ClaimICSTModal from "ui-component/claim-icst";

const useStyles = makeStyles((theme) => {
  const background = theme.palette.mode === "dark" ? theme.colors.darkSecondaryMain : theme.colors.lightPrimaryMain;
  return {
    box: {
      marginLeft: "16px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "8px",
      },
    },
    profileChip: {
      background,
      borderRadius: "12px",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      "&:hover": {
        background: `${background}!important`,
        backgroundColor: `${background}!important`,
      },
    },
  };
});

const ClaimICSTButton = ({ loading }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (loading) return;
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Chip
            className={classes.profileChip}
            label={`${loading ? "loading..." : `Claim ${ICS_TOKEN_INFO.symbol}`}`}
            variant="outlined"
            color="primary"
            onClick={handleClick}
          />
        </ButtonBase>
      </Box>
      <ClaimICSTModal open={open} onClose={() => setOpen(false)} claimCallback={() => setOpen(false)} />
    </React.Fragment>
  );
};

export default ClaimICSTButton;
