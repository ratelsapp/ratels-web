import type { Principal } from '@dfinity/principal';
export type Result = { 'ok' : boolean } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<User> } |
  { 'err' : string };
export type Result_2 = { 'ok' : User } |
  { 'err' : string };
export type Result_3 = { 'ok' : bigint } |
  { 'err' : string };
export interface User {
  'githubTime' : [] | [bigint],
  'twitter' : [] | [string],
  'twitterTime' : [] | [bigint],
  'user' : Principal,
  'discordTime' : [] | [bigint],
  'account' : string,
  'discord' : [] | [string],
  'principalId' : string,
  'github' : [] | [string],
}
export type VerifyType = { 'twitter' : null } |
  { 'discord' : null } |
  { 'github' : null };
export interface _SERVICE {
  'cycleAvailable' : () => Promise<Result_3>,
  'cycleBalance' : () => Promise<Result_3>,
  'find' : (arg_0: bigint) => Promise<Result_1>,
  'get' : () => Promise<Result_2>,
  'searchDiscordAccount' : (arg_0: string) => Promise<Result_1>,
  'searchGithubAccount' : (arg_0: string) => Promise<Result_1>,
  'searchIcpAccount' : (arg_0: string) => Promise<Result_1>,
  'searchMultiTwitterAccount' : (arg_0: Array<string>) => Promise<Result_1>,
  'searchTwitterAccount' : (arg_0: string) => Promise<Result_1>,
  'verify' : (arg_0: VerifyType, arg_1: string) => Promise<Result>,
}
