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

export interface NFTPoolsItem {
  cid: string;
  avatar: string;
  name: string;
  banner: string;
  apy: number;
  total: number;
  totalPOW: number;
  userPOW: number;
  startTime: number;
  endTime: number;
  totalReward: number;
  creator: string;
  canisterID: string;
  rewardToken: string;
  status: PoolStatus;
  ledgerCanisterId: string;
  accountId: string;
  cycles?: number | null;
  capCanisterId: string;
}

export interface MyNFTItem {
  id: string;
  cid: string;
  ledgerCanisterId: string;
  canisterID: string;
  isHosting: boolean;
  isPledge: boolean;
  accountId: string;
  account?: string;
}



export type VerifyType = 'github' | 'tiwwer' | 'discord' | null

export interface SearchItem {
  account: string
  discord: string
  discordTime: number
  github: string
  githubTime: number
  principalId: string
  twitter: string
  twitterTime: number
}
