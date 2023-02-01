import { Principal } from "@dfinity/principal";
import { AccountIdentifier } from "./ic/account_identifier";

export function isValidReactElement(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    !!object.$$typeof &&
    typeof object.$$typeof === "symbol" &&
    object.$$typeof.toString() === "Symbol(react.element)"
  );
}

export function firstLetterUpperCase(string) {
  if (!string) return string;
  return string.replace(/^\S/, (s) => s.toUpperCase());
}

export function openInNewWindow(url, id) {
  let a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("id", id);
  if (!document.getElementById(id)) {
    document.body.appendChild(a);
  }
  a.click();
}

export function icRocksLink(canisterId) {
  return `https://ic.rocks/principal/${canisterId}`;
}

export function icRocksAccountLink(account) {
  return `https://ic.rocks/account/${account}`;
}

export function nullParamsFormat(value) {
  return value ? [value] : [];
}

export const qff = (val, decimals = 0) => {
  if (val === null) {
    return val;
  }
  return Number(val).toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
};

export function shortenAddress(address, start = 4, end = 4) {
  if (!address) {
    return "";
  }
  return `${address.substring(0, start)}...${address.substring(
    address.length - end
  )}`;
}

export function getQueryString(name) {
  var h = window.location.href;
  h = h.substr(h.indexOf("?") + 1);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = h.match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
}

export const certifiedTwitterUrl = (redirectUri) => {
  return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dVJLSzBFeVBEVTh6blhXdjY2VUQ6MTpjaQ&redirect_uri=${redirectUri}&scope=tweet.read+users.read+offline.access&state=ratels&code_challenge=challenge&code_challenge_method=plain`;
};

export const certifiedDiscordUrl = (redirectUri) => {
  return `https://discord.com/api/oauth2/authorize?client_id=982876194980634686&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
};

export const certifiedGithubUrl = (redirectUri) => {
  return `https://github.com/login/oauth/authorize?client_id=f2e94d951f9681739f57&redirect_uri=${redirectUri}&scope=read:user`;
};

export const getTime = (time) => {
  if (!time) return "--";
  const t = String(time).substr(0, 13);
  return new Date(+t).toLocaleString();
};

export function principalToAccountIdentifier(principal) {
  return AccountIdentifier.fromPrincipal({
    principal: Principal.fromText(principal),
  }).toHex();
}
