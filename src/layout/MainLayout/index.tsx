import React from "react";
import { CssBaseline } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  content: {
    backgroundColor: "#030F09",
    width: "100%",
    minHeight: "calc(100vh)",
    flexGrow: 1,
    borderRadius: "8px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>{children}</main>
    </div>
  );
}
