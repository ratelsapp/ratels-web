import React from "react";
import { Grid, Link } from "@mui/material";
import { menuMediaItem } from "../Menus/media";

export default function MenuMediaList() {
  return (
    <Grid container mb={2} spacing={2}>
      {menuMediaItem.map((item, index) => {
        const Icon = item.icon;

        return (
          <Grid item container xs={3} justifyContent="center" key={index}>
            <Link href={item.url} target="_blank">
              <Icon />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
