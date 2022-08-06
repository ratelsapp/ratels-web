import React from "react";
import PropTypes from "prop-types";
import { Grid, Dialog, DialogTitle, DialogContent, Typography, useTheme, useMediaQuery } from "@mui/material";
import DialogCloseIcon from "assets/images/icons/dialog-close";
import { makeStyles } from "@mui/styles";
import { Trans } from "@lingui/macro";
import LoadingButton from "@mui/lab/LoadingButton";

const useStyles = makeStyles((theme) => ({
  container: {},
  titleContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    maxHeight: "630px",
    minHeight: "510px",
    position: "relative",
    paddingBottom: "80px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    "@media (max-width: 640px)": {
      fontSize: "1rem",
    },
  },
  desc: {
    fontSize: "12px",
    lineHeight: "15px",
    color: "#82828",
  },
  detailItem: {
    marginBottom: "24px",
  },
  value: {
    textAlign: "right",
    wordBreak: "break-all",
  },
  closeButton: {
    width: "27px",
    height: "27px",
    position: "absolute",
    right: 0,
    top: "10px",
    transform: "translate(0, -50%)",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: theme.colors.primaryMain,
    },
  },
  footer: {
    display: "flex",
    flexWrap: "nowrap",
    height: "73px",
    position: "absolute",
    bottom: "0",
    left: "0",
    borderTop: "1px solid #22201E",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: "10",
    "& button": {
      minWidth: "80px",
      padding: "8px 6px",
    },
  },
}));

const Modal = ({
  confirmLoading,
  loadingIndicator,
  title,
  showClose,
  children,
  open,
  confirmText,
  onClose,
  onConfirm,
  showConfirm,
  confirmDisabled,
  fullWidth,
  maxWidth,
  disabled,
  desc,
  dialogProps,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const isCustomizeTitle = () => {
    return !!title.$$typeof;
  };

  return (
    <Dialog
      className={classes.container}
      onClose={onClose}
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...dialogProps}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: "25px 24px",
          borderBottom: "1px solid #22201E",
          ...(matchDownMD ? { padding: "20px 24px" } : {}),
        },
        "& .MuiDialogContent-root": {
          paddingBottom: "0",
          ...(matchDownMD ? { padding: "8px 14px" } : {}),
        },
        "& .MuiPaper-root": {
          maxWidth: "822px",
          background: "linear-gradient(180deg, #191510 0%, #0D0D0D 100%)",
          border: "1px solid #22201E",
          padding: "0",
          margin: "30px 10px",
          width: "calc(100% - 20px)",
        },
        ...(dialogProps?.sx || {}),
      }}
    >
      {title ? (
        isCustomizeTitle() ? (
          title
        ) : (
          <DialogTitle onClose={onClose}>
            <Typography className={classes.titleContainer} component="div">
              <Typography className={classes.title} component="span" color="textPrimary">
                <Trans>{title}</Trans>
              </Typography>
              <Typography className={classes.desc} component="span" color="textPrimary" color="#82828" mt="9px">
                <Trans>{desc}</Trans>
              </Typography>
              {onClose && showClose ? <DialogCloseIcon onClick={onClose} className={classes.closeButton} /> : null}
            </Typography>
          </DialogTitle>
        )
      ) : null}

      <DialogContent>
        <Grid className={classes.contentContainer}>{children}</Grid>
        {showConfirm ? (
          <Grid className={classes.footer} px="30px" container alignItems="center" justifyContent="flex-end">
            <LoadingButton
              sx={{ flexShrink: 0 }}
              loading={confirmLoading}
              loadingIndicator={loadingIndicator}
              disableElevation
              disabled={confirmDisabled || confirmLoading || disabled}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              onClick={onConfirm}
            >
              <span>{confirmText}</span>
            </LoadingButton>
          </Grid>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

Modal.propTypes = {
  loadingIndicator: PropTypes.string,
  confirmLoading: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showClose: PropTypes.bool,
  onClose: PropTypes.func,
  showCancel: PropTypes.bool,
  showConfirm: PropTypes.bool,
  confirmText: PropTypes.string,
  confirmDisabled: PropTypes.bool,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  dialogProps: PropTypes.object,
};

Modal.defaultProps = {
  confirmLoading: false,
  showClose: true,
  showCancel: false,
  showConfirm: false,
  confirmText: "Ok",
  maxWidth: "md",
  fullWidth: true,
  onConfirm: () => {},
  onClose: () => {},
  onCancel: () => {},
  dialogProps: {},
};

export default Modal;
