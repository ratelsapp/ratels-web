import React from "react";
import { useSelector } from "react-redux";
import { SvgIcon } from "@mui/material";
import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const UserIcon = (props) => (
  <SvgIcon viewBox="0 0 24 12" {...props}>
    <path d="M15.2018 8.84423C14.1704 8.44027 13.0884 8.25 12 8.25C10.9119 8.25 9.83018 8.44016 8.79906 8.84388C8.39889 8.99788 8.12248 9.13897 7.93285 9.30863C7.72997 9.49016 7.6568 9.68113 7.61391 9.79309C7.61056 9.80182 7.6074 9.81007 7.60438 9.8178L7.33743 10.5H8.07H15.93H16.6926L16.3885 9.80064C16.3847 9.79191 16.3807 9.78241 16.3764 9.7722C16.3313 9.66555 16.254 9.48249 16.0596 9.30863C15.8713 9.14007 15.5988 8.99893 15.2018 8.84423ZM15.2018 8.84423C15.202 8.8443 15.2022 8.84438 15.2024 8.84445L15.02 9.31M15.2018 8.84423C15.2017 8.84419 15.2016 8.84415 15.2015 8.84411L15.02 9.31M15.02 9.31C15.1999 9.38008 15.3399 9.44252 15.4502 9.5H8.54445C8.65596 9.44252 8.79779 9.38008 8.98 9.31C9.95 8.93 10.97 8.75 12 8.75C13.03 8.75 14.05 8.93 15.02 9.31ZM4 8.5C4.12433 8.5 4.24703 8.50445 4.36911 8.51269C4.13165 9.09505 4 9.72786 4 10.39V11.5H0.5V10.43C0.5 9.82187 0.859238 9.28075 1.41846 9.03893L1.41956 9.03845C2.20911 8.69476 3.08135 8.5 4 8.5ZM22.5804 9.03845L22.5815 9.03893C23.1408 9.28075 23.5 9.82187 23.5 10.43V11.5H20V10.39C20 9.72786 19.8684 9.09505 19.6309 8.51269C19.753 8.50445 19.8757 8.5 20 8.5C20.9186 8.5 21.7909 8.69476 22.5804 9.03845ZM5.5 5C5.5 5.82386 4.82386 6.5 4 6.5C3.17614 6.5 2.5 5.82386 2.5 5C2.5 4.17614 3.17614 3.5 4 3.5C4.82386 3.5 5.5 4.17614 5.5 5ZM21.5 5C21.5 5.82386 20.8239 6.5 20 6.5C19.1761 6.5 18.5 5.82386 18.5 5C18.5 4.17614 19.1761 3.5 20 3.5C20.8239 3.5 21.5 4.17614 21.5 5ZM12 7.25C13.5517 7.25 14.9228 7.61175 16.0369 8.1069C16.9307 8.50413 17.5 9.4013 17.5 10.39V11.5H6.5V10.39C6.5 9.40191 7.06861 8.50524 7.96141 8.10764C9.07967 7.62042 10.4511 7.25 12 7.25ZM13.5 3C13.5 2.17386 12.8261 1.5 12 1.5C11.1739 1.5 10.5 2.17386 10.5 3C10.5 3.82614 11.1739 4.5 12 4.5C12.8261 4.5 13.5 3.82614 13.5 3ZM9.5 3C9.5 1.61614 10.6161 0.5 12 0.5C13.3839 0.5 14.5 1.61614 14.5 3C14.5 4.38386 13.3839 5.5 12 5.5C10.6161 5.5 9.5 4.38386 9.5 3Z" />
  </SvgIcon>
);

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    background: theme.palette.mode === "dark" ? theme.colors.darkLevel3 : "#EFEFFF",
    marginBottom: "20px",
    overflow: "hidden",
    position: "relative",
  },
  cardContent: {
    position: "relative",
    zIndex: 123,
    paddingBottom: "16px!important",
  },
  userTitle: {
    color: theme.palette.mode === "dark" ? theme.colors.darkTextPrimary : theme.colors.primaryMain,
  },
  userNum: {
    color: theme.palette.mode === "dark" ? theme.colors.darkTextSecondary : theme.colors.primaryMain,
  },
  menuAvatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    borderRadius: "12px",
    background: theme.palette.mode === "dark" ? theme.colors.darkLevel4 : theme.colors.primaryMain,
    marginRight: "12px",
  },
  userIcon: {
    color: theme.palette.mode === "dark" ? theme.colors.darkTextSecondary : "#fff",
  },
}));

const MenuCard = () => {
  const classes = useStyles();
  const { userCounter } = useSelector((state) => state.global);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} sx={{ p: 2 }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems="flex-start" disableGutters={true} sx={{ p: 0 }}>
            <ListItemAvatar sx={{ mt: 0 }}>
              <Avatar variant="rounded" className={classes.menuAvatar}>
                <UserIcon className={classes.userIcon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 0, mb: 0 }}
              primary={
                <Typography variant="subtitle1" color="primary" className={classes.userTitle}>
                  Cumulative Users
                </Typography>
              }
              secondary={
                <Typography variant="caption" className={classes.userNum}>
                  {userCounter}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default MenuCard;
