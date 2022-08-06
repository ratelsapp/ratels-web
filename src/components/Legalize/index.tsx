import React, { useEffect, useState } from "react";
import { certifiedTwitterUrl, certifiedGithubUrl, certifiedDiscordUrl, getQueryString } from "utils";
import { getVerifyGithubUserInfo, getVerifyDiscordUserInfo, getVerifyTwitterUserInfo } from "apis";
import { ReactComponent as TwitterIcon } from "assets/svgs/twitter.svg";
import { ReactComponent as DiscordIcon } from "assets/svgs/discord.svg";
import { ReactComponent as GithubIcon } from "assets/svgs/github.svg";
import { verify, get } from "hooks/user/useUser";
import useWeb3 from "hooks/useWeb3";
import { CONNECTIDS, WEBSITE_URL } from "config";
import cls from "classnames";
import "./_style.scss";
import { Skeleton } from "@mui/material";

interface Props {
  setTabIndex: (index: number) => void
}
const Legalize: React.FC<Props> = () => {
  const { account, identity } = useWeb3();
  const [twitterVerify, setTwitterVerify] = useState(null);
  const [discordVerify, setDiscordVerify] = useState(null);
  const [githubVerify, setGithubVerify] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account && identity) {
      getVerifyData();
      const code = getQueryString("code");

      if (code) {
        if (code.length === 20) {
          verifyGithub(code);
        } else if (code.length === 30) {
          verifyDiscord(code);
        } else if (code.length === 91) {
          verifyTwitter(code);
        }
      }
    } else {
      setTwitterVerify(null);
      setDiscordVerify(null);
      setGithubVerify(null);
    }
  }, [account, identity]);

  const getVerifyData = async () => {
    setLoading(true);
    const res = await get(CONNECTIDS.user, identity);
    setLoading(false);
    setTwitterVerify(res.twitter[0] || null);
    setDiscordVerify(res.discord[0] || null);
    setGithubVerify(res.github[0] || null);
  };

  const verifyGithub = async (code: string) => {
    getVerifyGithubUserInfo(code).then(async res => {
      if (res.code === 200) {
        const name = res.data;
        const contractRes = await verify(CONNECTIDS.user, identity, { "github": null }, name);
        if (contractRes) {
          setGithubVerify(name);
        }
      }
    });
  };

  const verifyDiscord = async (code: string) => {
    getVerifyDiscordUserInfo(code).then(async res => {
      if (res.code === 200) {
        const name = res.data;
        const contractRes = await verify(CONNECTIDS.user, identity, { "discord": null }, name);
        if (contractRes) {
          setDiscordVerify(name);
        }
      } else {
        console.error("verifyDiscord error", res);
      }
    }).catch(err => {
      console.error("verifyDiscord error", err);
    });
  };

  const verifyTwitter = async (code: string) => {
    getVerifyTwitterUserInfo(code).then(async res => {
      if (res.code === 200) {
        const name = res.data;
        const contractRes = await verify(CONNECTIDS.user, identity, { "twitter": null }, name);
        if (contractRes) {
          setTwitterVerify(name);
        }
      } else {
        console.error("verifyTwitter error", res);
      }
    }).catch(err => {
      console.error("verifyTwitter error", err);
    });
  };

  return (
    <div className="legalize">
      {
        loading ?
          <Skeleton className="legalize-item"></Skeleton> :
          <a className={cls("legalize-item twitter", { verify: twitterVerify })}
             href={certifiedTwitterUrl(WEBSITE_URL)}>
            {
              twitterVerify &&
              <div className="verifyStatus">Verified</div>
            }
            <TwitterIcon />
            <div className="legalize-item__text">{twitterVerify ? twitterVerify : "Twitter"}</div>
          </a>
      }
      {
        loading ?
          <Skeleton className="legalize-item"></Skeleton> :
          <a
            className={cls("legalize-item discord", { verify: discordVerify })}
            href={certifiedDiscordUrl(WEBSITE_URL)}>
            {
              discordVerify &&
              <div className="verifyStatus">Verified</div>
            }
            <DiscordIcon />
            <div className="legalize-item__text">{discordVerify ? discordVerify : "Discord"}</div>
          </a>
      }
      {
        loading ? <Skeleton className="legalize-item"></Skeleton> :
          <a className={cls("legalize-item github", { verify: githubVerify })}
             href={certifiedGithubUrl(WEBSITE_URL)}>
            {
              githubVerify &&
              <div className="verifyStatus">Verified</div>
            }
            <GithubIcon />
            <div className="legalize-item__text">{githubVerify ? githubVerify : "Github"}</div>
          </a>
      }
    </div>
  );
};

export default Legalize;
