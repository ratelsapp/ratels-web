import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  SNACKBAR_OPEN,
  SNACKBAR_CLOSE,
  LOADING_OPEN,
  LOADING_CLOSE,
} from "store/actions";

export const TIP_SUCCESS = "success";
export const TIP_ERROR = "error";

export function useTips() {
  const dispatch = useDispatch();

  const open = useCallback(
    (message, type) => {
      if (type === TIP_ERROR) {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message,
          variant: "alert",
          alertSeverity: "error",
        });
      } else {
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message,
          variant: "alert",
          alertSeverity: "success",
        });
      }
    },
    [dispatch]
  );

  const close = useCallback(() => {
    dispatch({
      type: SNACKBAR_CLOSE,
    });
  }, [dispatch]);

  return useMemo(() => [open, close], [open, close]);
}

export function useSuccessTip() {
  const [openCallback, closeCallback] = useTips();

  const open = useCallback(
    (message) => {
      openCallback(message, TIP_SUCCESS);
    },
    [openCallback]
  );

  const close = useCallback(() => {
    closeCallback();
  }, [closeCallback]);

  return useMemo(() => [open, close], [open, close]);
}

export function useErrorTip() {
  const [openCallback, closeCallback] = useTips();

  const open = useCallback(
    (message) => {
      openCallback(message, TIP_ERROR);
    },
    [openCallback]
  );

  const close = useCallback(() => {
    closeCallback();
  }, [closeCallback]);

  return useMemo(() => [open, close], [open, close]);
}

export function useFullscreenLoading() {
  const dispatch = useDispatch();

  const open = useCallback(() => {
    dispatch({
      type: LOADING_OPEN,
    });
  }, [dispatch]);

  const close = useCallback(() => {
    dispatch({
      type: LOADING_CLOSE,
    });
  }, [dispatch]);

  return useMemo(() => [open, close], [open, close]);
}
