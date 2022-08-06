import React from "react";
import { Chip, Box, ButtonBase } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  profileChip: {
    background: theme.palette.mode === "dark" ? theme.colors.darkLevel4 : theme.colors.lightLevel2,
    borderRadius: "12px",
    color: theme.palette.mode === "dark" ? theme.colors.darkTextSecondary : theme.colors.lightPrimaryMain,
    border: "none",
  },
}));

const ProfileSection = ({ value, label }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Chip
            classes={{ label: classes.profileLabel }}
            className={classes.profileChip}
            label={`${label}: ${value}`}
            variant="outlined"
            color="primary"
          />
        </ButtonBase>
      </Box>
    </React.Fragment>
  );
};

export default ProfileSection;
