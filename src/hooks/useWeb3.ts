import { useSelector } from "react-redux";

const useWeb3 = () => {
  const auth = useSelector((state: any) => state.auth);

  return {
    account: auth.account,
    accounts: auth.accounts,
    logined: auth.logined,
    identity: auth.identity,
    loginType: auth.loginType,
    loading: auth.loading || false,
  };
};

export default useWeb3;
