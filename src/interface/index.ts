export enum PoolStatus {
  IDLE = 0,
  COMING_SOON = 1,
  LIVE = 2,
  FINISHED = 3,
  FILL = 4,
}

export interface NFT {
  name: string;
  image: any;
  status: PoolStatus;
}

export interface UserInfo {
  nfts: string[];
  userPOW: number;
  stakingNFTCount: number;
  rewardDebt: number;
}

export interface PoolInfo {
  totalPOW: number;
  rewardToken: string;
  standard: string;
  rewardDebt: number;
  perSecond: number;
  total: number;
}

export type VerifyType = "github" | "tiwwer" | "discord" | null;

export interface SearchItem {
  account: string;
  discord: string;
  discordTime: number;
  github: string;
  githubTime: number;
  principalId: string;
  twitter: string;
  twitterTime: number;
}
