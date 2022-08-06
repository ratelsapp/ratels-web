export const canisterids = {
  ICPDogNfts: "rdmx6-jaaaa-aaaaa-aaadq-cai",
  NNS_CANISTER_ID: "qoctq-giaaa-aaaaa-aaaea-cai",
  tokenIdentifierID: "renrk-eyaaa-aaaaa-aaada-cai",
};

export const POLLING_INTERVAL = 15 * 1000;

export const CONNECTIDS = {
  candidUI: '6cnwd-nyaaa-aaaaa-aabfa-cai',
  user: 'wlcaj-eyaaa-aaaal-aav4a-cai',
}

export const LINK = {
  Twitter: 'https://twitter.com/ratels_wallet?s=21',
  Telegram: 'https://t.me/Ratels_official',
  Discord: 'https://discord.gg/z9Waaswdtw',
  DSCVR: 'https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/u/Ratels_wallet',
  Github: 'https://github.com/',
  howtouse: 'https://medium.com/@ratelswallet/how-to-use-ratels-web3-97149409e9f2',
  icscan: `https://icscan.io/canister/${CONNECTIDS.user}`
}

export const CONNECT_IDS = Object.values(CONNECTIDS)

// export const BASE_URL = 'https://api.dtest.app'
export const BASE_URL = 'https://api.ratels.app'

// export const WEBSITE_URL = 'https://uywlp-pqaaa-aaaaa-aaa4q-cai.dtest.app'
export const WEBSITE_URL = 'https://wmdg5-jaaaa-aaaal-aav4q-cai.ic0.app'

const config = {
  // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "",
  defaultPath: "/",
  fontFamily: `'Montserrat','Poppins',sans-serif`,
  borderRadius: 12,
  outlinedFilled: true,
  theme: "dark",
  presetColor: "default", // default, theme1, theme2, theme3, theme4, theme5, theme6
  // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  i18n: "en",
  rtlLayout: false,
};

export default config;
