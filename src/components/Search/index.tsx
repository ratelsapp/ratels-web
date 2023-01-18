import React, { ChangeEvent, useEffect, useState } from "react";
import cls from "classnames";
import { Button, Menu, MenuItem, Box, Snackbar, Alert } from "@mui/material";
import { ReactComponent as SelectIcon } from "assets/svgs/select.svg";
import {
  getTwitterFolloweUserName,
  getTwitterShareUserInfo,
  getTwitterShareUserInfoCount,
} from "apis";
import {
  searchMultiTwitterAccount,
  searchTwitterAccount,
  searchIcpAccount,
  searchDiscordAccount,
  searchGithubAccount,
} from "hooks/user/useUser";
import useWeb3 from "hooks/useWeb3";
import "./_style.scss";
import { ThreeDots } from "react-loading-icons";

export enum Platform {
  Discord = "Discord",
  Twitter = "Twitter",
  Github = "Github",
}

export enum SearchType {
  Account = "Account",
  Followers = "Followers",
  TweetUrl = "TweetUrl",
}

interface Props {
  onSearch: (list: any[]) => void;
  tabIndex: number;
  setSearchLoaded: (bool: boolean) => void;
  setRate: (rate: number) => void;
  setList: (arr: any[]) => void;
}

type AlertType = "success" | "info" | "warning" | "error";

const Search: React.FC<Props> = ({
  onSearch,
  setRate,
  setList,
  setSearchLoaded,
  tabIndex: index,
}) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [selectPlatform, setSelectPlatform] = useState(Platform.Twitter);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { identity } = useWeb3();
  const [selectType, setSelectType] = useState(SearchType.Account);
  const [searchTypeEl, setSearchTypeEl] = React.useState<null | HTMLElement>(
    null
  );
  const openType = Boolean(searchTypeEl);
  const [searchVal, setSearchVal] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertType, setAlertType] = useState<AlertType>("success");
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tabIndex !== 2) {
      setSelectType(SearchType.Account);
    }
  }, [tabIndex]);

  useEffect(() => {
    setSearchVal("");
    setList([]);
    setSearchLoaded(false);
  }, [tabIndex, selectType]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickType = (event: React.MouseEvent<HTMLElement>) => {
    setSearchTypeEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeClose = () => {
    setSearchTypeEl(null);
  };

  const handleSearch = async () => {
    if (!searchVal) {
      onSearch([]);
      return;
    }
    setSearchLoaded(false);
    setLoading(true);

    if (tabIndex === 4 && index === 3 && selectType === SearchType.Account) {
      const contractRes = await searchGithubAccount(identity, searchVal);
      onSearch(contractRes);
      setSearchLoaded(true);
      setLoading(false);
    } else if (
      tabIndex === 3 &&
      index === 3 &&
      selectType === SearchType.Account
    ) {
      const contractRes = await searchDiscordAccount(identity, searchVal);
      onSearch(contractRes);
      setSearchLoaded(true);
      setLoading(false);
    } else if (
      tabIndex === 1 &&
      index === 3 &&
      selectType === SearchType.Account
    ) {
      const contractRes = await searchIcpAccount(identity, searchVal);
      onSearch(contractRes);
      setSearchLoaded(true);
      setLoading(false);
    } else if (
      index === 3 &&
      selectType === SearchType.Followers &&
      tabIndex === 2
    ) {
      getTwitterFolloweUserName(searchVal)
        .then(async (res) => {
          if (res.code === 200) {
            const names = res.data || [];
            setLoading(false);
            const contractRes = await searchMultiTwitterAccount(
              identity,
              names
            );

            onSearch(contractRes);
            setSearchLoaded(true);
          } else {
            setLoading(false);
            if (res.message === "invalid_user") {
              setOpenAlert(true);
              setAlertType("error");
              setAlertText("invalid user");
            }
          }
        })
        .catch((error) => {
          console.error("getTwitterFolloweUserName error: ", error.message);
          setLoading(false);
        });
    } else if (
      index === 3 &&
      selectType === SearchType.TweetUrl &&
      tabIndex === 2
    ) {
      const strarr: string[] = searchVal.split("/");
      let TweetId = strarr.slice(strarr.length - 1) + "";

      const index = TweetId.indexOf("?");

      if (index !== -1) {
        TweetId = TweetId.slice(0, index);
      }

      if (TweetId) {
        let pageSize = 100;
        let countRes = await getTwitterShareUserInfoCount(TweetId);

        if (countRes.code === 500) {
          setOpenAlert(true);
          setAlertType("error");
          setAlertText("invalid user");
          setLoading(false);
          return;
        }

        const count = countRes.data.retweet_count || 0;
        const total = Math.ceil(count / pageSize);
        let arr: any[] = [];
        let cursor = "";

        (async function loop() {
          for (let i = 0; i < total; i++) {
            const res = await getTwitterShareUserInfo(TweetId, cursor);

            if (res.code === 200) {
              const resArr: any[] = res.data;
              const len = resArr.length;
              let cursorNew = resArr[len - 1].tweet_id || "";

              if (!cursorNew) {
                setRate(100);
                break;
              } else {
                cursor = cursorNew;
              }

              const names = resArr.map((item) => item.username);

              const contractRes = await searchMultiTwitterAccount(
                identity,
                names
              );
              arr = arr.concat(contractRes);
              setRate((i / total) * 100);
            } else {
              setLoading(false);
              if (res.message === "invalid_user") {
                setOpenAlert(true);
                setAlertType("error");
                setAlertText("invalid user");
              }
              break;
            }
          }
          onSearch(arr);
          setSearchLoaded(true);
          setRate(0);
          setLoading(false);
        })();
      }
    } else if (
      index === 3 &&
      selectType === SearchType.Account &&
      tabIndex === 2
    ) {
      const contractRes = await searchTwitterAccount(identity, searchVal);
      onSearch(contractRes);
      setSearchLoaded(true);
      setLoading(false);
    } else if (
      index === 3 &&
      selectPlatform === Platform.Twitter &&
      tabIndex === 2
    ) {
      const contractRes = await searchTwitterAccount(identity, searchVal);
      onSearch(contractRes);
      setSearchLoaded(true);
      setLoading(false);
    }
  };

  const handleSelectPlatform = (type: Platform) => {
    setSelectPlatform(type);
    handleClose();
  };

  const handleSelectType = (type: SearchType) => {
    setSelectType(type);
    handleTypeClose();
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

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const onKeyup = (e: any) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertText}
        </Alert>
      </Snackbar>

      {index === 3 && (
        <div className="searchtab">
          <div
            className={cls("searchtab_item", {
              active: tabIndex === 1,
              disabled: false,
            })}
            onClick={() => setTabIndex(1)}
          >
            ICP Address
          </div>
          <div
            className={cls("searchtab_item", { active: tabIndex === 2 })}
            onClick={() => setTabIndex(2)}
          >
            Twitter
          </div>
          <div
            className={cls("searchtab_item", {
              active: tabIndex === 3,
              disabled: false,
            })}
            onClick={() => setTabIndex(3)}
          >
            Discord
          </div>
          <div
            className={cls("searchtab_item", {
              active: tabIndex === 4,
              disabled: false,
            })}
            onClick={() => setTabIndex(4)}
          >
            Github
          </div>
        </div>
      )}

      <div className="search_bottom">
        {index === 3 && (
          <Box className="search_platformWrap">
            <Button
              className="search_platform"
              id="customized-button"
              aria-controls={openType ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openType ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClickType}
              endIcon={<SelectIcon />}
            >
              {selectType}
            </Button>
          </Box>
        )}

        <Menu
          open={openType}
          anchorEl={searchTypeEl}
          onClose={handleTypeClose}
          className="menu"
        >
          <MenuItem
            className={cls("seletItem", { disabled: false })}
            selected={selectType === SearchType.Account}
            onClick={() => handleSelectType(SearchType.Account)}
          >
            Account
          </MenuItem>
          {tabIndex === 2 && (
            <MenuItem
              className={cls("seletItem", { disabled: false })}
              selected={selectType === SearchType.TweetUrl}
              onClick={() => handleSelectType(SearchType.TweetUrl)}
            >
              Tweet url
            </MenuItem>
          )}
          {tabIndex === 2 && (
            <MenuItem
              className={cls("seletItem", { disabled: false })}
              selected={selectType === SearchType.Followers}
              onClick={() => handleSelectType(SearchType.Followers)}
            >
              Followers
            </MenuItem>
          )}
        </Menu>

        {index === 2 && (
          <Box className="search_platformWrap">
            <Button
              className="search_platform"
              id="customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<SelectIcon />}
            >
              {selectPlatform}
            </Button>
          </Box>
        )}

        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className="menu"
        >
          <MenuItem
            className="seletItem"
            selected={selectPlatform === Platform.Twitter}
            onClick={() => handleSelectPlatform(Platform.Twitter)}
          >
            Twitter
          </MenuItem>

          <MenuItem
            disabled
            className="seletItem"
            selected={selectPlatform === Platform.Discord}
            onClick={() => handleSelectPlatform(Platform.Discord)}
          >
            Discord
          </MenuItem>

          <MenuItem
            disabled
            className="seletItem"
            selected={selectPlatform === Platform.Github}
            onClick={() => handleSelectPlatform(Platform.Github)}
          >
            Github
          </MenuItem>
        </Menu>

        <div className="search_inputWrap">
          <input
            onKeyUp={onKeyup}
            className="search_input"
            type="text"
            placeholder="Enter searching information"
            value={searchVal}
            onChange={(e) => handleChangeSearch(e)}
          />
          <Button
            disabled={loading}
            className="search_btn"
            onClick={handleSearch}
          >
            {loading ? <ThreeDots width={44} /> : "Search"}{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
