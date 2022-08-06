import { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@mui/material";
import LogoutConfirmModal from "./confirm-modal";
import { useUserLogout } from "store/auth/hooks";
import { Trans } from "@lingui/macro";

const LogOutSection = () => {
  const history = useHistory();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const logout = useUserLogout();

  const onLogoutConfirm = async () => {
    await logout();
    setLogoutConfirmOpen(false);
    history.push("/connectWallet");
  };

  return (
    <>
      <Button fullWidth variant="outlined" size="large" onClick={() => setLogoutConfirmOpen(true)}>
        <Trans>Logout</Trans>
      </Button>
      <LogoutConfirmModal
        open={logoutConfirmOpen}
        onConfirm={onLogoutConfirm}
        onCancel={() => setLogoutConfirmOpen(false)}
      />
    </>
  );
};

export default LogOutSection;
