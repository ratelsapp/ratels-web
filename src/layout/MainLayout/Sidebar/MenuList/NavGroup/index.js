import { useState } from "react";
import { List, Typography, Box, Grid, useTheme } from "@mui/material";
import { SubNavItem } from "./../NavItem";
import NavCollapse from "./../NavCollapse";
import { ArrowForwardIos } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  menuCaption: {
    display: "flex",
    borderRadius: "12px",
    ...theme.typography.menuCaption,
    "&::section": {
      background: "transparent",
    },
  },
  subMenuCaption: {
    ...theme.typography.subMenuCaption,
  },
}));

export default function NavGroup({ item, hoveringId, setHoveringId }) {
  const classes = useStyles();
  const theme = useTheme();

  const isActiveMenu = () => customization.isOpen.findIndex((id) => id === item.id) > -1;

  const isHover = item.id === hoveringId;

  const handleMouseEnter = () => {
    setHoveringId(item.id);
  };

  const handleMouseLeave = () => {
    setHoveringId(null);
  };

  const items = item.children.map((menu) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <SubNavItem key={menu.id} item={menu} level={1} hoveringId={hoveringId} setHoveringId={setHoveringId} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const [open, setOpen] = useState(false);

  return (
    <List
      sx={{
        width: "100%",
        paddingBottom: "0",
        cursor: "pointer",
        marginBottom: "5px",
      }}
      subheader={
        item.title && (
          <Typography
            variant="caption"
            className={classes.menuCaption}
            sx={{
              ...(open ? { background: theme.palette.background.level4 } : {}),
              "&:hover": {
                background: theme.themeOption.defaultGradient,
                "& .MuiSvgIcon-root, & .MuiTypography-root": {
                  color: "#fff",
                },
              },
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            display="block"
          >
            <Grid
              container
              alignItems="center"
              onClick={() => setOpen(!open)}
              style={{ width: "100%", paddingRight: "18px" }}
            >
              <Box
                sx={{
                  minWidth: "36px",
                  display: "inline-flex",
                  ...(open ? { color: theme.palette.text.primary } : {}),
                }}
              >
                {item.icon}
              </Box>
              <Grid item xs>
                <Typography
                  component="span"
                  sx={{
                    ...(open ? { color: theme.palette.text.primary } : {}),
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>
              <ArrowForwardIos
                fontSize="18"
                sx={{
                  transform: open ? "rotate(-90deg)" : "rotate(90deg)",
                  transition: "all 300ms",
                }}
              />
            </Grid>
            {item.caption && (
              <Typography variant="caption" className={classes.subMenuCaption} display="block">
                {item.caption}
              </Typography>
            )}
          </Typography>
        )
      }
    >
      {open ? (
        <Box
          sx={{
            padding: "8px 0 8px 48px",
          }}
        >
          <Box
            sx={{
              position: "relative",
              "&:before": {
                content: "''",
                position: "absolute",
                top: 0,
                left: "-22px",
                background: "#4F5A84",
                width: "1px",
                height: "100%",
              },
            }}
          >
            {items}
          </Box>
        </Box>
      ) : null}
    </List>
  );
}
