import { useEffect, useMemo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { updateICPBalance, updateICPBlocks, updateXDR2USD, updateICPPriceList } from "./actions";

import { useICPBalanceCall, useICPBalanceCallback, useICPBlocksCall } from "hooks/useICPCalls";
import { parseTokenAmount, BigNumber, timestampToTimes } from "utils";
import { useXDR2USDCallback } from "hooks/useXDR2USD";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ICPPriceActor } from "utils/icp-price/ICPPriceActor";

export function useUserLocale() {
  return useSelector((state) => state.global.userLocale);
}

export function useComingSoonState() {
  return useSelector((state) => state.global.comingSoon);
}

export function useAccount() {
  return useAppSelector((state) => state.session.account);
}

export function useICPBalance() {
  return useAppSelector((state) => state.global.ICPBalance);
}

export function useICSBalance() {
  return useAppSelector((state) => state.global.ICSBalance);
}

export function useQueryICPBalance(address) {
  const dispatch = useAppDispatch();
  const { result } = useICPBalanceCall(address);

  useEffect(() => {
    if (result && result.status === 200) {
      const balances = result.data.balances;
      dispatch(updateICPBalance(parseTokenAmount(balances[0].value)));
    }
  }, [result, dispatch]);
}

export function useUpdateICPBalanceCallback() {
  const dispatch = useAppDispatch();
  const callback = useICPBalanceCallback();

  return useCallback(
    async (address) => {
      const result = await callback(address);
      if (result && result.status === 200) {
        const balances = result.data.balances;
        dispatch(updateICPBalance(parseTokenAmount(balances[0].value)));
      }
    },
    [dispatch]
  );
}

export function useICPBlocksManager() {
  const dispatch = useAppDispatch();
  const { result } = useICPBlocksCall();
  const { blocks, secondBlocks } = result ?? {};

  useEffect(() => {
    dispatch(updateICPBlocks({ blocks: blocks ?? "", secondBlocks: secondBlocks ?? "" }));
  }, [dispatch, blocks, secondBlocks]);

  return useMemo(
    () => ({
      blocks,
      secondBlocks,
    }),
    [blocks, secondBlocks]
  );
}

export function useICPPrice() {
  const ICPPriceList = useICPPriceList();

  return useMemo(() => {
    if (ICPPriceList && ICPPriceList.length) {
      const price = ICPPriceList[ICPPriceList.length - 1]["value"];
      return price;
    }
    return undefined;
  }, [ICPPriceList]);
}

export function useICP2CyclesManager() {
  const ICPPriceList = useICPPriceList();

  return useMemo(() => {
    if (ICPPriceList && ICPPriceList.length) {
      return ICPPriceList[ICPPriceList.length - 1]?.xdr ?? 0;
    }
    return 0;
  }, [ICPPriceList]);
}

export function useXDR2USD() {
  return useAppSelector((state) => state.global.xdr_usdt);
}

export function useXDR2USDManager() {
  const dispatch = useAppDispatch();
  const callback = useXDR2USDCallback();
  const XDR2USD = useXDR2USD();

  return [
    XDR2USD,
    useCallback(async () => {
      const result = await callback();
      if (result && result.XDR_USD) {
        dispatch(updateXDR2USD(result.XDR_USD));
      }
    }, [dispatch]),
  ];
}

export function useICPPriceList() {
  return useAppSelector((state) => state.global.ICPPriceList);
}

export function useAddCatchTokenCallback() {
  const dispatch = useAppDispatch();

  return useCallback(
    (tokens) => {
      dispatch(addCatchToken(tokens));
    },
    [dispatch]
  );
}

export function useUserLocaleManager() {
  const dispatch = useAppDispatch();
  const locale = useUserLocale();

  const setLocale = useCallback(
    (newLocale) => {
      dispatch(updateUserLocale(newLocale));
    },
    [dispatch]
  );

  return [locale, setLocale];
}

export function useQueryICPListCallback() {
  const dispatch = useAppDispatch();
  const xdr_usdt = useXDR2USD();
  const [listProposals, setListProposals] = useState([]);

  useEffect(() => {
    if (!listProposals || !xdr_usdt || listProposals.length === 0) return;
    let priceList = [];

    for (let z of listProposals) {
      // @ts-ignore
      let price = z.proposal[0]?.title[0].split(" ");
      price = parseFloat(price[price.length - 1]);
      priceList.push({
        value: new BigNumber(new BigNumber(price).times(xdr_usdt || 1.42).toFixed(2)).toNumber(),
        // @ts-ignore
        timestamp: timestampToTimes(new BigNumber(z.proposal_timestamp_seconds.toString()).times(1000).toNumber()),
        xdr: new BigNumber(price).toFixed(2),
      });
    }

    dispatch(updateICPPriceList(priceList.reverse()));
  }, [xdr_usdt, listProposals]);

  return useCallback(async () => {
    // @ts-ignore
    const { proposal_info = [] } = await ICPPriceActor.list_proposals({
      include_reward_status: [0, 1, 2, 3, 4].map(BigInt),
      before_proposal: [],
      limit: 100,
      exclude_topic: [1, 3, 4, 5, 6, 7, 8, 9, 10].map(BigInt),
      include_status: [1, 2, 3, 4, 5].map(BigInt),
    });
    setListProposals(proposal_info);
  }, [dispatch, xdr_usdt]);
}
