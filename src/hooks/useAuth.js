import { useCallback, useEffect, useState } from "react";
import { StoicIdentity } from "ic-stoic-identity";
import { useDispatch } from "react-redux";
import { LOGIN, AUTH_LOADING } from "store/actions";
import { LOGOUT } from "../store/actions";
import { CONNECT_IDS } from "../config";
import { AuthClient } from "@dfinity/auth-client";
import { principalToAccountIdentifier } from "utils/index";

const currentLocaAccount = Number(localStorage.currentLocaAccount) || 0;

const setCurrentLocaAccount = (num) => {
  if (!num) {
    localStorage.removeItem("currentLocaAccount");
    return;
  }
  localStorage.currentLocaAccount = num;
};

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [accounts, setAccounts] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(currentLocaAccount || 0);
  const [loginType, setLoginType] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (identity && accounts.length) {
      dispatch({
        type: LOGIN,
        identity: identity,
        account: accounts[currentAccount]?.address,
        accounts: accounts,
        logined: identity ? true : false,
        loginType: loginType,
        // loading: loading
      });
    }
  }, [accounts, identity, currentAccount, loginType]);

  useEffect(() => {
    dispatch({
      type: AUTH_LOADING,
      loading: loading,
    });
  }, [loading]);

  const login = useCallback(async (type, collections = []) => {
    setLoading(true);
    let id = null;
    if (type === "stoic") {
      try {
        id = await StoicIdentity.connect();
        if (id) {
          setIdentity(id);
          id.accounts().then((accs) => {
            setLoading(false);
            setAccounts(JSON.parse(accs));
          });
          setCurrentAccount(0);
          setCurrentLocaAccount(0);
          localStorage.setItem("_loginType", type);
          setLoginType(type);
        } else {
          setLoading(false);
          throw new Error("Failed to connect to your wallet");
        }
      } catch (e) {
        setLoading(false);
      }
    }
    if (type === "plug") {
      try {
        const result = await window.ic.plug.requestConnect({
          whitelist: collections.concat(CONNECT_IDS),
        });

        setLoading(false);
        if (result) {
          if (!window.ic.plug.agent) {
            await window.ic.plug.createAgent({
              whitelist: collections.concat(CONNECT_IDS),
            });
          }

          id = await window.ic.plug.agent._identity;
          setIdentity(id);

          const address = principalToAccountIdentifier(
            id.getPrincipal().toText()
          );

          if (address) {
            setAccounts([
              {
                name: "PlugWallet",
                address: address,
              },
            ]);
          }

          setCurrentAccount(0);
          setCurrentLocaAccount(0);
          localStorage.setItem("_loginType", type);
          setLoginType(type);
        } else {
          setLoading(false);
          throw new Error("Failed to connect to your wallet");
        }
      } catch (e) {
        setLoading(false);
        console.error("login plug error:", e.message);
      }
    }

    if (type === "internet") {
      const client = await AuthClient.create();

      await new Promise((resolve, reject) => {
        client?.login({
          onSuccess: () => resolve(true),
          onError: reject,
        });
      });

      const identity = client?.getIdentity();

      const principal = identity?.getPrincipal().toString();

      setIdentity(identity);
      setCurrentAccount(0);
      setCurrentLocaAccount(0);
      localStorage.setItem("_loginType", type);
      setLoginType(type);
      setLoading(false);
      setAccounts([
        {
          name: "InternetIdentity",
          address: principalToAccountIdentifier(principal, 0),
        },
      ]);
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem("_loginType");
    StoicIdentity.disconnect();
    setIdentity(false);
    setAccounts([]);
    setCurrentAccount("");
    dispatch({ type: LOGOUT });

    const client = await AuthClient.create();
    client?.logout();
  }, []);

  const load = (collections = []) => {
    const t = localStorage.getItem("_loginType");
    if (t) {
      setLoading(true);
      switch (t) {
        case "stoic":
          StoicIdentity.load()
            .then(async (identity) => {
              if (identity !== false) {
                setIdentity(identity);
                setLoginType(t);
                identity.accounts().then((accs) => {
                  setLoading(false);
                  setAccounts(JSON.parse(accs));
                });
              } else {
                setLoading(false);
                console.error("Error from stoic connect");
              }
            })
            .catch((e) => {
              setLoading(false);
              console.error("Error from stoic connect");
            });
          break;
        case "plug":
          (async () => {
            const connected = await window.ic.plug.isConnected();
            if (connected) {
              if (!window.ic.plug.agent) {
                await window.ic.plug.createAgent({
                  whitelist: collections.concat(CONNECT_IDS),
                });
              }
              var id = await window.ic.plug.agent._identity;
              setIdentity(id);
              setLoginType(t);
              setLoading(false);

              const address = principalToAccountIdentifier(
                id.getPrincipal().toText()
              );

              if (address) {
                setAccounts([
                  {
                    name: "Plug Wallet",
                    address: address,
                  },
                ]);
              }
            }
          })();
          break;
        case "internet":
          (async () => {
            const client = await AuthClient.create();
            const connected = await client.isAuthenticated();

            if (connected) {
              const identity = client.getIdentity();
              const principal = identity?.getPrincipal().toString();

              setIdentity(identity);
              setLoginType(t);
              setLoading(false);
              setAccounts([
                {
                  name: "InternetIdentity",
                  address: principalToAccountIdentifier(principal),
                },
              ]);
            }
          })();
        default:
          break;
      }
    }
  };

  return { login, logout, loading, load };
};

export default useAuth;
