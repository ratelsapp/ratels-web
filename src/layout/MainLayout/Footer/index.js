import React from "react";
import { Grid } from "@mui/material";
import { useICPBlocksManager, useICP2CyclesManager, useICPPriceList } from "store/global/hooks";
import BigNumber from "bignumber.js";
import { EMPTY_CONTENT_SYMBOL } from "constants/index";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      "& .MuiGrid-root": {
        color: theme.themeOption.textSecondary,
      },
    },
    dot: {
      width: "5px",
      height: "5px",
      marginRight: theme.spacing(1),
      borderRadius: "50%",
      backgroundColor: "#7F77EC",
      "&.price": {
        marginTop: theme.spacing(2),
        marginRight: "-8px",
      },
    },
  };
});

export default function Footer() {
  const classes = useStyles();

  // const { blocks, secondBlocks } = useICPBlocksManager();
  // const icpToCycles = useICP2CyclesManager();

  const ICPPriceList = useICPPriceList();
  // const usdt = ICPPriceList && ICPPriceList.length && ICPPriceList[ICPPriceList.length - 1].value;

  return (
    // <Grid container justifyContent="space-between" alignItems="center" spacing={1} className={classes.footer}>
    //   <Grid item md={6} lg={3} container justifyContent="center" alignItems="center">
    //     <span className={classes.dot}></span>
    //     1ICP = {icpToCycles || EMPTY_CONTENT_SYMBOL} T Cycles
    //   </Grid>
    //   <Grid container item md={6} lg={3} spacing={2} justifyContent="center">
    //     <Grid container spacing={2} item justifyContent="center" alignItems="center">
    //       <span className={`${classes.dot} price`}></span>
    //       <Grid item>ICP:</Grid>
    //       <Grid item>🇺🇸 ${usdt ?? EMPTY_CONTENT_SYMBOL}</Grid>
    //       <Grid item>
    //         🇨🇳 ¥{!!usdt || usdt === 0 ? new BigNumber(usdt).times(6.5).toString() : EMPTY_CONTENT_SYMBOL}
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item md={6} lg={3} container justifyContent="center" alignItems="center">
    //     <span className={classes.dot}></span>
    //     Blocks: {blocks ? new BigNumber(blocks).toFormat() : EMPTY_CONTENT_SYMBOL}
    //   </Grid>
    //   <Grid item md={6} lg={3} container justifyContent="center" alignItems="center">
    //     <span className={classes.dot}></span>
    //     Blocks/second: {secondBlocks ? new BigNumber(secondBlocks).toFixed(2) : EMPTY_CONTENT_SYMBOL}
    //   </Grid>
    // </Grid>
    1234
  );
}
