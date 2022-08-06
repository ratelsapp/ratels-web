import { BASE_URL } from "config";
import axios from "axios";

export const getTwitterFolloweUserName = async (username: string) => {
  return await axios({
    url: BASE_URL + "/api/v1/ratels/twitter/follower",
    method: "post",
    data: { username: username }
  }).then(res => res.data);
};

export const getVerifyGithubUserInfo = async (code: string) => {
  return await axios.post(BASE_URL + "/api/v1/ratels/github/user", {
    code: code
  }).then(res => res.data);
};

export const getVerifyDiscordUserInfo = async (code: string) => {
  return await axios.post(BASE_URL + "/api/v1/ratels/discord/user", {
    code: code
  }).then(res => res.data);
};

export const getVerifyTwitterUserInfo = async (code: string) => {
  return await axios.post(BASE_URL + "/api/v1/ratels/twitter/user", {
    code: code
  }).then(res => res.data);
};

export const getTwitterShareUserInfo = async (id: string | number, cursor: number | string) => {
  const params: any = {
    id: id,
  }
  if (cursor) {
    params['cursor'] = cursor
  }
  return await axios.post(BASE_URL + "/api/v1/ratels/twitter/retweet",params).then(res => res.data);
};

export const getTwitterShareUserInfoCount = async (id: string | number) => {
  return await axios.post(BASE_URL + "/api/v1/ratels/twitter/retweet/count", {
    id: id
  }).then(res => res.data).catch(err => 0);
};

export const getTwitterFollowerUserInfo = async (id: string) => {
  return await axios.post(BASE_URL + "/api/v1/ratels/twitter/follower", {
    id: id
  }).then(res => res.data);
};
