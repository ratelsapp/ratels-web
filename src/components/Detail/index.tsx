import React from "react";
import { Typography } from "@mui/material";
import { getTime } from "utils";
import { ReactComponent as TwitterIcon } from "assets/svgs/twitter.svg";
import { ReactComponent as DiscordIcon } from "assets/svgs/discord.svg";
import { ReactComponent as GithubIcon } from "assets/svgs/github.svg";
import "./_style.scss";

interface Props {
  data: any
}

const Detail: React.FC<Props> = ({ data }) => {
  return (
    <div className="resultDetail">
      <Typography className="toptips" mb="12px">Account ID:</Typography>
      <Typography className="toptips" mb="20px">{data.account}</Typography>
      <Typography className="toptips" mb="12px">Principal ID:</Typography>
      <Typography className="toptips" mb="34px">{data.principalId}</Typography>
      <div className="table">
        <div className="table_head">
          <div className="table_head--item"></div>
          <div className="table_head--item">Account</div>
          <div className="table_head--item">Date</div>
        </div>
        <div className="table_row">
          <div className="table_row--item"><TwitterIcon width={21} height={17} />Twitter</div>
          <div className="table_row--item">{data.twitter[0] || "--"}</div>
          <div className="table_row--item">{getTime(data.twitterTime[0])}</div>
        </div>
        <div className="table_row">
          <div className="table_row--item"><DiscordIcon width={19} height={22} />Discord</div>
          <div className="table_row--item">{data.discord[0] || "--"}</div>
          <div className="table_row--item">{getTime(data.discordTime[0])}</div>
        </div>
        <div className="table_row">
          <div className="table_row--item"><GithubIcon width={21} height={21} />Github</div>
          <div className="table_row--item">{data.github[0] || "--"}</div>
          <div className="table_row--item">{getTime(data.githubTime[0])}</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
