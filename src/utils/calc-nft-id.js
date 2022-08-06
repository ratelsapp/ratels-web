const { Principal } = require("@dfinity/principal");

/**
 *
 * @param principal : nft_canister_id
 * @param index
 * @returns {string}
 */
export const tokenIdentifier = (principal, index) => {
  const padding = Buffer("\x0Atid");
  const array = new Uint8Array([...padding, ...Principal.fromText(principal).toUint8Array(), ...to32bits(index)]);
  return Principal.fromUint8Array(array).toText();
};
const to32bits = (num) => {
  let b = new ArrayBuffer(4);
  new DataView(b).setUint32(0, num);
  return Array.from(new Uint8Array(b));
};


console.log(tokenIdentifier("rno2w-sqaaa-aaaaa-aaacq-cai", 0));
console.log(tokenIdentifier("3bqt5-gyaaa-aaaah-qcvha-cai", 8598));
// console.log(tokenIdentifier("renrk-eyaaa-aaaaa-aaada-cai", 1));
// console.log(tokenIdentifier("renrk-eyaaa-aaaaa-aaada-cai", 2));
// console.log(tokenIdentifier("renrk-eyaaa-aaaaa-aaada-cai", 3));
