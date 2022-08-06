import _BigNumber from "bignumber.js";
import dayjs from "dayjs";
import store from "../store";
import { ASSETS_DECIMALS, ICP_BALANCE_DECIMALS, ICS_BALANCE_DECIMALS } from "../constants/index";

const { principal_id_to_address, address_to_hex, address_from_hex } = require("@dfinity/rosetta-client");
// TODO: hijack bigint
BigInt.prototype.toJSON = function () {
  return this.toString();
};

_BigNumber.config({
  ROUNDING_MODE: _BigNumber.ROUND_DOWN,
});

export const BigNumber = _BigNumber;
export const NO_GROUP_SEPARATOR_FORMATTER = {
  groupSeparator: "",
};

const CryptoJS = require("crypto-js");
export const zero = new BigNumber(0);
export const getBalanceAmount = (amount, decimals = 8) => {
  if (amount !== 0 && !amount) return zero;
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(amount);
  return new BigNumber(amount).dividedBy(10 ** decimals);
};
export const formatTokenAmount = (amount, decimals = 8) => {
  if (amount !== 0 && !amount) return zero;
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(amount);
  return new BigNumber(amount).multipliedBy(10 ** decimals);
};
export const parseTokenAmount = (amount, decimals = 8) => {
  if (amount !== 0 && !amount) return new BigNumber(0);
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(amount);
  return new BigNumber(amount).dividedBy(10 ** decimals);
};
export function numberToString(num) {
  if (num) return new BigNumber(num).toFormat(NO_GROUP_SEPARATOR_FORMATTER);
  return "";
}
export const getAllBalanceAmount = (amount, decimals = 8) => {
  if (amount !== 0 && !amount) return zero;
  if (typeof amount === "bigint") amount = Number(amount);
  if (typeof decimals === "bigint") decimals = Number(decimals);
  if (Number.isNaN(Number(amount))) return new BigNumber(amount);
  return new BigNumber(amount).multipliedBy(10 ** decimals);
};
export const getBalanceToString = (value) => {
  if (value !== 0 && !value) return "0";
  if (typeof value === "bigint") value = Number(value);
  return new BigNumber(value).toString();
};
export const getBalanceToFormat = (value) => {
  if (value !== 0 && !value) return "0";
  if (typeof value === "bigint") value = Number(value);
  return new BigNumber(value).toFormat();
};
export const timestampToTimes = (timestamp) => {
  if (!timestamp) return "";
  timestamp = new BigNumber(String(timestamp).substr(0, 13)).toNumber();
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};
export const splitString = (string, length = 4) => {
  if (!string) return string;
  return `${string.slice(0, length)}....${string.slice(-length)}`;
};

export function encryptPassword(password) {
  return CryptoJS.AES.encrypt(password, password).toString();
}
export function decryptPassword(password) {
  const { wallet } = store.getState();
  const { encryptPassword } = wallet;
  return CryptoJS.AES.decrypt(encryptPassword, password).toString(CryptoJS.enc.Utf8);
}
export function encryptMnemonic(password) {
  return (mnemonic) => CryptoJS.AES.encrypt(mnemonic, password).toString();
}
export function decryptMnemonic(password) {
  return (mnemonic) => CryptoJS.AES.decrypt(mnemonic, password).toString(CryptoJS.enc.Utf8);
}

export function getMnemonic(password) {
  if (!password) return null;
  const { wallet } = store.getState();

  let mnemonic = null;
  try {
    // TODO fix mnemonic decrypt utf-8 error
    mnemonic = decryptMnemonic(password)(wallet.mnemonic);
  } catch (err) {
    console.log(err);
  }

  return mnemonic;
}

export const getTokenPriceBySymbol = (symbol) => {
  const {
    global: { ICPPriceList },
  } = store.getState();

  if (symbol === "ICP" && ICPPriceList.length) {
    const price = ICPPriceList[ICPPriceList.length - 1]["value"];
    return price || "--";
  }
  return "--";
};

export const unitPrice = (price) => {
  if (price === "--") return price;
  return `${getUnit()} ${price}`;
};

export function getUnit() {
  return "$";
}

export const getTokenAssetsBySymbol = (balance, symbol) => {
  if (balance) {
    let newBalance = balance;
    if (typeof balance === "bigint") newBalance = Number(newBalance);
    let price = getTokenPriceBySymbol(symbol);
    if (price === "--") price = 0;
    const assets = new BigNumber(price).times(newBalance).toFixed(ASSETS_DECIMALS).toString();
    return assets;
  }
  return 0;
};

export const cyclesBalanceFormat = (value, noUnit) => {
  if (value === 0 || !value) return noUnit ? `0` : `0 T`;
  return `${getBalanceAmount(value, 12).toFixed(4).toString()}${noUnit ? "" : " T"}`;
};

function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function quickInnerSort(arr, partition, left, right) {
  let partitionIndex = null;

  left = typeof left !== "number" ? 0 : left;
  right = typeof right !== "number" ? arr.length - 1 : right;

  if (left < right) {
    partitionIndex = partition(arr, left, right);
    quickInnerSort(arr, partition, left, partitionIndex - 1);
    quickInnerSort(arr, partition, partitionIndex + 1, right);
  }

  return arr;
}

export function quickSort(arr, key, valueFormat) {
  const getArrIndexValue = (arr, index) => {
    if (key) {
      return valueFormat ? valueFormat(arr[index][key]) : arr[index][key];
    }
    return valueFormat ? valueFormat(arr[index]) : arr[index];
  };

  const partition = (arr, left, right) => {
    const pivot = left;
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
      if (new BigNumber(getArrIndexValue(arr, i)).isLessThan(getArrIndexValue(arr, pivot))) {
        swap(arr, i, index);
        index++;
      }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
  };

  return quickInnerSort(arr, partition);
}

export function tokenBalanceDecimalsFormat(symbol, balance = 0, tokenDecimals = 8) {
  let decimals = tokenDecimals;
  switch (symbol) {
    case "ICP":
      decimals = ICP_BALANCE_DECIMALS;
      break;
    case "ICS":
    case "ICST":
      decimals = ICS_BALANCE_DECIMALS;
      break;
    default:
      break;
  }
  return new _BigNumber(balance).toFixed(decimals);
}

export function getUserClaimTokenStatus() {
  const {
    global: { hasBeenClaimTestToken },
  } = store.getState();
  return hasBeenClaimTestToken;
}

export function getQueryPagination(pageNum, pageSize) {
  const pageStart = (pageNum - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  return [pageStart, pageEnd];
}

export function transactionsTypeFormat(type) {
  if (typeof type === "string") return type;
  if (typeof type === "object") {
    if (type) {
      return Object.keys(type)[0];
    }
  }
  return type;
}

export function moErrMessageFormat(errMessage) {
  let _errMessage = errMessage.toString();
  return _errMessage.split("Reject text: ")[1]?.replace(/\s/g, "");
}

export function isValidReactElement(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    !!object.$$typeof &&
    typeof object.$$typeof === "symbol" &&
    object.$$typeof.toString() === "Symbol(react.element)"
  );
}

export function isValidAddress(address) {
  let valid = true;
  try {
    address_from_hex(address);
  } catch (err) {
    valid = false;
  }
  return valid;
}

export function principalToAddress(principal) {
  if (!principal) return principal;
  return address_to_hex(principal_id_to_address(principal));
}

export function canisterToLedgerAccount(canisterId) {
  if (!canisterId) return canisterId;
  return address_to_hex(principal_id_to_address(canisterId));
}

export function enumTypeFormat(type) {
  if (typeof type === "string") return type;
  if (typeof type === "object") {
    if (type) {
      return Object.keys(type)[0];
    }
  }
  return type;
}

export function isDarkTheme(theme) {
  return theme.customization.navType === "dark";
}

export function enumResultFormat(result) {
  if (!result) {
    return {
      status: "err",
      data: null,
    };
  }

  const key = Object.keys(result);

  if (result && key && key[0]) {
    return {
      status: key[0],
      data: result[key[0]],
    };
  }

  return result;
}

export function firstLetterUpperCase(string) {
  if (!string) return string;
  return string.replace(/^\S/, (s) => s.toUpperCase());
}

export const isOfficial = (account) => {
  return (
    account === "b2b33b29fa0f9458ec7ba0025f6a53126043fad143dd17619d5f162f41e69869" ||
    account === "e695fda51d898ad6f46211d8f468f85dd1364819e52c7740e4b4db90918ea6bc"
  );
};

export function isPrincipal(principal) {
  return !!principal && principal._isPrincipal;
}

export function isValidQueryPagination(offset, limit) {
  return (!!offset || offset === 0) && !!limit;
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

export function nanosecond2Millisecond(time) {
  return new BigNumber(time).dividedBy(1000000).toNumber();
}

export function millisecond2Nanosecond(time) {
  return new BigNumber(new Date(time).getTime()).multipliedBy(1000000).toNumber();
}

export function nullParamsFormat(value) {
  return value ? [value] : [];
}

export const qff = (val, decimals = 0) => {
  if (val === null) {
    return val;
  }
  return Number(val).toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
};

export function shortenAddress(address, start = 4, end = 4) {
  if (!address) {
    return "";
  }
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}

export const isCanister = (c) => {
  return c.length === 27 && c.split("-").length === 5;
};

export function getQueryString(name) {
  var h = window.location.href
  h = h.substr(h.indexOf('?') + 1)
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = h.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

export const certifiedTwitterUrl = (redirectUri) => {
  return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=dVJLSzBFeVBEVTh6blhXdjY2VUQ6MTpjaQ&redirect_uri=${redirectUri}&scope=tweet.read+users.read+offline.access&state=ratels&code_challenge=challenge&code_challenge_method=plain`
}

export const certifiedDiscordUrl = (redirectUri) => {
  return `https://discord.com/api/oauth2/authorize?client_id=982876194980634686&redirect_uri=${redirectUri}&response_type=code&scope=identify`
}

export const certifiedGithubUrl = (redirectUri) => {
  return `https://github.com/login/oauth/authorize?client_id=f2e94d951f9681739f57&redirect_uri=${redirectUri}&scope=read:user`
}

export const getTime = (time) => {
  if (!time) return '--'
  const t = String(time).substr(0, 13)
  return new Date(+t).toLocaleString()
}
