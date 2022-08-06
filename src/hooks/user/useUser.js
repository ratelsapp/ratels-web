import { CONNECTIDS } from '../../config'
import { idlFactory } from '../../actor/user.did'
import { CANISTER_NAMES } from "constants/canister";
import { Actor } from "actor/Actor";

const userActor = async (cid, identity) => {
  const logintype = localStorage._loginType

  if (logintype === 'plug') {
    const NNSUiActor = await window.ic.plug.createActor({
      canisterId: CONNECTIDS.user,
      interfaceFactory: idlFactory,
    });

    return NNSUiActor
  }else {
    return await Actor.create({
      canisterId: CONNECTIDS.user,
      identity,
      canisterName: CANISTER_NAMES.user,
    });
  }
}

export async function verify(cid, identity, type, user){
  const result = await (await userActor(cid, identity)).verify(type, user);

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function get(cid, identity){
  const result = await (await userActor(cid, identity)).get();

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchTwitterAccount(cid, identity, username){
  const result = await (await userActor(cid, identity)).searchTwitterAccount(username.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchMultiTwitterAccount(cid, identity, usernames = []){
  const result = await (await userActor(cid, identity)).searchMultiTwitterAccount(usernames);

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchIcpAccount(cid, identity, account){
  const result = await (await userActor(cid, identity)).searchIcpAccount(account.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchDiscordAccount(cid, identity, account){
  const result = await (await userActor(cid, identity)).searchDiscordAccount(account.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchGithubAccount(cid, identity, account){
  const result = await (await userActor(cid, identity)).searchGithubAccount(account.trim());
  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}
