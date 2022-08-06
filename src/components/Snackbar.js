import React from "react";
import { useSelector, useDispatch } from "react-redux";

// material-ui
import { Alert, Button, Fade, Grow, IconButton, Slide } from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";

// assets
import CloseIcon from "@mui/icons-material/Close";

import { SNACKBAR_CLOSE } from "../store/actions";

// animation function
function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

// animation options
const transition = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade: Fade,
};

//-----------------------|| SNACKBAR ||-----------------------//

const Snackbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const snackbarInitial = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: SNACKBAR_CLOSE,
    });
  };

  React.useEffect(() => {
    setOpen(snackbarInitial.open);
  }, [snackbarInitial.action, snackbarInitial.open]);

  return (
    <React.Fragment>
      {/* default snackbar */}
      {snackbarInitial.variant === "default" && (
        <MuiSnackbar
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={snackbarInitial.autoHideDuration}
          onClose={handleClose}
          message={snackbarInitial.message}
          TransitionComponent={transition[snackbarInitial.transition]}
        />
      )}

      {/* alert snackbar */}
      {snackbarInitial.variant === "alert" && (
        <MuiSnackbar
          TransitionComponent={transition[snackbarInitial.transition]}
          anchorOrigin={snackbarInitial.anchorOrigin}
          open={open}
          autoHideDuration={snackbarInitial.autoHideDuration}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            severity={snackbarInitial.alertSeverity}
            sx={{
              bgcolor: snackbarInitial.alertSeverity + ".dark",
              color: snackbarInitial.alertSeverity === "warning" ? "grey.800" : "",
            }}
            action={
              <React.Fragment>
                {snackbarInitial.actionButton !== false && (
                  <Button color="secondary" size="small" onClick={handleClose}>
                    UNDO
                  </Button>
                )}
                {snackbarInitial.close !== false && (
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </React.Fragment>
            }
          >
            {snackbarInitial.message}
          </Alert>
        </MuiSnackbar>
      )}
    </React.Fragment>
  );
};

export default Snackbar;
