import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles, useTheme } from "@mui/styles";
import {
  CardContent,
  Chip,
  ClickAwayListener,
  List,
  Paper,
  Popper,
  Grid,
  ButtonBase,
  Button,
  Box,
  Typography,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import MainCard from "ui-component/cards/MainCard";
import ExportMnemonicModal from "ui-component/modal/exportMnemonic";
import Transitions from "ui-component/extended/Transitions";
import Copy from "ui-component/copy/copy";
import { splitString, icRocksAccountLink, openInNewWindow } from "utils";
import { Trans } from "@lingui/macro";
import LogOutSection from "../LogOutSection";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fff",
  },
  navContainer: {
    width: "100%",
    maxWidth: "350px",
    minWidth: "300px",
    borderRadius: "10px",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
    },
  },
  headerAvatar: {
    cursor: "pointer",
    ...theme.typography.mediumAvatar,
    margin: "8px 0 8px 8px !important",
  },
  profileChip: {
    height: "48px",
    alignItems: "center",
    borderRadius: "27px",
    transition: "all .2s ease-in-out",
    borderColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main + "!important",
      color: theme.palette.primary.light,
      "& svg": {
        stroke: theme.palette.primary.light,
      },
    },
  },
  profileLabel: {
    lineHeight: 0,
    padding: "12px",
  },
  listItem: {
    wordBreak: "break-all",
    padding: "16px 12px",
    marginBottom: "16px",
    textAlign: "left",
    background: theme.colors.lightGray50,
    border: "1px solid #EFEFFF",
    borderRadius: "8px",
  },
  cardContent: {
    padding: "16px !important",
  },
  card: {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.dark[800] : theme.palette.primary.light,
    marginBottom: "16px",
    marginTop: "16px",
  },
  searchControl: {
    width: "100%",
    paddingRight: "8px",
    paddingLeft: "16px",
    marginBottom: "16px",
    marginTop: "16px",
  },
  startAdornment: {
    fontSize: "1rem",
    color: theme.palette.grey[500],
  },
  flex: {
    display: "flex",
  },
  name: {
    marginLeft: "2px",
    fontWeight: 400,
  },
  box: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  profileRoot: {
    background: theme.palette.mode === "dark" ? theme.themeOption.defaultGradient : theme.colors.lightPrimaryMain,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.themeOption.defaultGradient
          : `${theme.colors.lightPrimaryMain}!important`,
    },
  },
  account: {
    wordBreak: "break-all",
    cursor: "pointer",
  },
  copyButton: {
    position: "relative",
    top: "3px",
    marginLeft: "3px",
  },
}));

export function ICRocksLoadIcon(props) {
  return (
    <SvgIcon viewBox="0 0 15 14" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H6V2H2V12H12V8H14V14H0V0Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7865 2H8.40071V0H13.0033H14.0033V1V5.60261H12.0033V3.6116L5.81851 9.79641L4.4043 8.3822L10.7865 2Z"
      />
    </SvgIcon>
  );
}

const ProfileSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const { account } = useSelector((state) => state.cache);
  const [open, setOpen] = useState(false);
  const [openExportMnemonic, setOpenExportMnemonic] = useState(false);
  const anchorRef = useRef(null);
  const copyRef = useRef(null);
  const prevOpen = useRef(open);
  const history = useHistory();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogin = () => {
    history.push(`/connectWallet${location.search || ""}`);
  };

  useEffect(() => {
    if (anchorRef.current && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleCopy = () => {
    if (copyRef) {
      copyRef.current.copy();
    }
  };

  const handleToICRocks = () => {
    openInNewWindow(icRocksAccountLink(account), "ic_rocks_account");
  };

  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Chip
            classes={{ root: classes.profileRoot, label: classes.profileLabel }}
            label={splitString(account) || "Login"}
            variant="outlined"
            ref={anchorRef}
            onClick={account ? handleToggle : handleLogin}
            color="primary"
          />
        </ButtonBase>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                  className={classes.paper}
                >
                  <CardContent className={classes.cardContent}>
                    <List component="nav" className={classes.navContainer}>
                      <Box className={classes.listItem}>
                        <Typography
                          component="span"
                          sx={{
                            whiteSpace: "break-spaces",
                            cursor: "pointer",
                            color: "#29314F",
                          }}
                          onClick={handleCopy}
                        >
                          {account}
                        </Typography>
                        <Copy content={account} hide ref={copyRef} />
                        <Box component="span" ml="5px" sx={{ overflow: "hidden" }}>
                          <ICRocksLoadIcon
                            fontSize="24"
                            sx={{
                              position: "relative",
                              top: "1px",
                              cursor: "pointer",
                              color: theme.colors.secondaryMain,
                            }}
                            onClick={handleToICRocks}
                          />
                          {/* <Reply
                            fontSize="24"
                            sx={{
                              position: "relative",
                              top: "1px",
                              cursor: "pointer",
                              transform: "rotateY(180deg)",
                              color: theme.colors.secondaryMain,
                            }}
                          /> */}
                        </Box>
                      </Box>
                      {/* <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <AnimateButton>
                            <Button
                              disableElevation
                              fullWidth
                              size={matchDownMD ? "small" : "large"}
                              type="button"
                              variant="outlined"
                              href={`https://dashboard.internetcomputer.org/account/${account}`}
                              target="_blank"
                            >
                              <Trans>Views Browser</Trans>
                            </Button>
                          </AnimateButton>
                        </Grid>
                        <Grid item xs={6}>
                          <AnimateButton>
                            <Button
                              disableElevation
                              fullWidth
                              size={matchDownMD ? "small" : "large"}
                              type="button"
                              variant="contained"
                              color="primary"
                              onClick={() => setOpenExportMnemonic(true)}
                            >
                              <Trans>Export Mnemonic</Trans>
                            </Button>
                          </AnimateButton>
                        </Grid>
                      </Grid> */}
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Button
                            disableElevation
                            fullWidth
                            size={matchDownMD ? "small" : "large"}
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenExportMnemonic(true)}
                          >
                            <Trans>Export Mnemonic</Trans>
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <LogOutSection />
                        </Grid>
                      </Grid>
                    </List>
                    {/* </PerfectScrollbar> */}
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
      <ExportMnemonicModal open={openExportMnemonic} handleClose={() => setOpenExportMnemonic(false)} />
    </React.Fragment>
  );
};

export default ProfileSection;
