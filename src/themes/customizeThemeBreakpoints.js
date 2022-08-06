import { createTheme } from "@mui/material";

export const customizeTheme = createTheme({
  breakpoints: {
    values: {
      md: 960,
      md1: 1400,
    },
  },
});

export const customizeBreakPoints = customizeTheme.breakpoints;
