import React, { useState } from "react";
import { Box, Theme, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import plug from "assets/images/wallet/plug.png";
import stoic from "assets/images/wallet/stoic.png";
import classNames from "classnames";

import { ReactComponent as CloseIcon } from "assets/svgs/close.svg";

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 10
    },
    mask: {
      position: "absolute",
      top: 0,
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(3, 3, 3, 0.8)"
    },
    content: {
      overflow: "hidden",
      width: "500px",
      position: "absolute",
      borderRadius: "12px",
      padding: "0",
      background: "#242927",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      [theme.breakpoints?.down("sm")]: {
        width: "90%"
      }
    },
    text: {
      fontSize: "16px",
      marginTop: "16px",
      [theme.breakpoints?.down("sm")]: {
        fontSize: "12px",
        marginTop: "6px"
      }
    },
    item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      height: "153px",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden",
      background: "#2C302E",
      border: "1px solid #343836",
      borderRadius: "10px",

      "&:not(:first-child)": {
        marginLeft: "24px"
      },
      [theme.breakpoints?.down("sm")]: {
        height: "100px",
        "&:not(:first-child)": {
          marginLeft: "12px"
        }
      }
    },
    radio: {
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "16px",
      height: "16px"
    },
    cancelButton: {
      borderColor: "red",
      border: "1px solid #000000"
    },
    header: {
      height: "80px",
      padding: "0 24px",
      [theme.breakpoints?.down("sm")]: {
        height: "60px",
        padding: "0 15px"
      }
    },
    closeIcon: {
      width: "22px",
      color: "#5F5F5F",
      cursor: "pointer"
    }
  };
});

export type WalletType = "stoic" | "plug" | "internet";

export interface ComingSoonProps {
  open: boolean;
  onClose?: () => void;
  connectLoading?: boolean;
  login: (type: WalletType) => void;
}

export default function SelectWallet({ onClose, open, login }: ComingSoonProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [active, setActive] = useState<WalletType>("stoic");
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const handleActive = (type: WalletType) => {
    setActive(type);
    login(type);
  };

  return open ? (
    <Box className={classes.container}>
      <Box className={classes.mask} onClick={onClose} />

      <Box className={classes.content}>
        <Grid className={classes.header} container justifyContent="space-between" alignItems="center" bgcolor="#0F1814">
          <Typography color="#fff" fontSize="20px">
            Connect Wallet
          </Typography>
          <CloseIcon className={classes.closeIcon} onClick={onClose} />
        </Grid>

        <Grid container my="24px" borderRadius="12px" px={matchDownSM ? "10px" : "24px"}>


          {/*<Grid*/}
          {/*  item*/}
          {/*  className={classNames(classes.item, {*/}
          {/*    active: active === "internet"*/}
          {/*  })}*/}
          {/*  onClick={() => handleActive("internet")}*/}
          {/*>*/}
          {/*  <InternetIdentityIcon />*/}
          {/*  <Typography className={classes.text} color="#fff">*/}
          {/*    Internet Identity*/}
          {/*  </Typography>*/}
          {/*</Grid>*/}

          <Grid
            item
            className={classNames(classes.item, {
              active: active === "stoic"
            })}
            onClick={() => handleActive("stoic")}
          >
            <img alt="S" src={stoic} style={{ height: 56 }} />
            <Typography className={classes.text} color="#fff">
              Stoic Wallet
            </Typography>
          </Grid>

          <Grid
            item
            className={classNames(classes.item, {
              active: active === "plug"
            })}
            onClick={() => handleActive("plug")}
          >
            <img alt="S" src={plug} style={{ height: 52 }} />
            <Typography className={classes.text} color="#fff">
              Plug
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  ) : null;
}
