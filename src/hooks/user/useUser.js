import { idlFactory } from "../../declarations/user.did.js";
import { Actor } from "actor/Actor";
import { USER_CID } from "../../constants/index";
import { host } from "../../constants/server";

const userActor = async (identity) => {
  const loginType = localStorage._loginType;

  if (loginType === "plug") {
    const NNSUiActor = await window.ic.plug.createActor({
      canisterId: USER_CID,
      interfaceFactory: idlFactory,
      host,
    });

    return NNSUiActor;
  } else {
    return await Actor.create({
      canisterId: USER_CID,
      identity,
      idlFactory,
      host,
    });
  }
};

export async function verify(identity, type, user) {
  const result = await (await userActor(identity)).verify(type, user);

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function get(identity) {
  const result = await (await userActor(identity)).get();

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchTwitterAccount(identity, username) {
  const result = await (
    await userActor(identity)
  ).searchTwitterAccount(username.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchMultiTwitterAccount(identity, usernames = []) {
  const result = await (
    await userActor(identity)
  ).searchMultiTwitterAccount(usernames);

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchIcpAccount(identity, account) {
  const result = await (
    await userActor(identity)
  ).searchIcpAccount(account.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchDiscordAccount(cid, identity, account) {
  const result = await (
    await userActor(identity)
  ).searchDiscordAccount(account.trim());

  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}

export async function searchGithubAccount(identity, account) {
  const result = await (
    await userActor(identity)
  ).searchGithubAccount(account.trim());
  if (result.ok) {
    return result.ok;
  } else {
    return [];
  }
}
