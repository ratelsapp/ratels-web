import React, { useMemo, useState } from "react";
import {
  Alert,
  Snackbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { shortenAddress } from "utils";
import { ReactComponent as WalletIcon } from "assets/svgs/wallet.svg";
import SelectWallet from "../SelectWallet";
import useWeb3 from "hooks/useWeb3";
import { ThreeDots } from "react-loading-icons";
import { CopyToClipboard as Clipboard } from "react-copy-to-clipboard";
import { ReactComponent as CopyIcon } from "assets/svgs/copy.svg";
import { ReactComponent as LogoutIcon } from "assets/svgs/logout.svg";
import useAuth from "hooks/useAuth";
import "./_style.scss";

export default function Header() {
  const { account, loading } = useWeb3();
  const { login, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const accountStr = useMemo(() => {
    return shortenAddress(account);
  }, [account]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleCopy = () => {
    setOpenAlert(true);
  };

  const handleLogout = () => {
    logout();
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (account) {
      setAnchorEl(event.currentTarget);
    } else {
      setOpen(true);
    }
  };

  const handleLogin = (type: string) => {
    login(type);
    setOpen(false);
  };

  return (
    <header>
      <div className="walletWrap" onClick={handleClickAccount}>
        <WalletIcon />
        {account ? (
          <>
            <Typography fontSize="14px">{accountStr}</Typography>
          </>
        ) : loading ? (
          <ThreeDots width="40px" style={{ marginLeft: "10px" }} />
        ) : (
          <Typography fontSize="14px">Connect Wallet</Typography>
        )}
      </div>

      <SelectWallet
        open={open}
        login={handleLogin}
        connectLoading={loading}
        onClose={() => setOpen(false)}
      />

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "#171717",
            border: "1px solid #333333",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiListItemIcon-root": {
              minWidth: "26px",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -1,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "#171717",
              transform: "translateY(-50%) rotate(45deg)",
              borderTopColor: "red",
              borderTop: "1px solid #333333",
              borderLeft: "1px solid #333333",
              zIndex: -1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Clipboard text={account} onCopy={handleCopy}>
          <MenuItem sx={{ padding: "15px 18px" }}>
            <ListItemIcon>
              <CopyIcon fontSize="small" />
            </ListItemIcon>
            <Typography fontSize={16} color="#fff" ml="-5px">
              Copy address
            </Typography>
          </MenuItem>
        </Clipboard>

        <MenuItem sx={{ padding: "15px 18px" }} onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" fill="#fff" />
          </ListItemIcon>
          <Typography fontSize={16} color="#fff" ml="-5px">
            Logout
          </Typography>
        </MenuItem>
      </Menu>

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copy Successfully
        </Alert>
      </Snackbar>
    </header>
  );
}
