import axios from "axios";
import { useCallback } from "react";
import { useCallsData } from "hooks/useCallsData";

const ServiceApi = {};
const CyclesMintingService = {};

const ROSETTA_API__BASE = "https://rosetta-api.internetcomputer.org";
const INTERNET_COMPUTER_BASE = "https://ic-api.internetcomputer.org/api";

export function useICPBalanceCallback() {
  return useCallback((address) => {
    return axios.post(ROSETTA_API__BASE + "/account/balance", {
      network_identifier: {
        blockchain: "Internet Computer",
        network: "00000000000000020101",
      },
      account_identifier: {
        address,
      },
    });
  }, []);
}

export function useICPBalanceCall(address) {
  const callback = useICPBalanceCallback();
  return useCallsData(
    useCallback(() => callback(address), [callback, address]),
    !!address
  );
}

export function useICPTransactionsCallback() {
  return useCallback((address) => {
    return axios
      .post(ROSETTA_API__BASE + "/search/transactions", {
        network_identifier: {
          blockchain: "Internet Computer",
          network: "00000000000000020101",
        },
        account_identifier: {
          address,
        },
      })
      .then((res) => {
        if (res.status === 200) return res.data;
        return {};
      });
  }, []);
}

export function useICPTransactionsCall(address) {
  const callback = useICPTransactionsCallback();
  return useCallsData(
    useCallback(() => callback(address), [callback, address]),
    !!address
  );
}

export function useICPBlocksCall() {
  return useCallsData(
    useCallback(async () => {
      const { data: rateBlock } = await axios.get(
        INTERNET_COMPUTER_BASE + "/metrics/block-rate"
      );

      const { data: pBlock } = await axios.get(
        INTERNET_COMPUTER_BASE + "/metrics/pblock"
      );

      return {
        blocks: pBlock?.block[0][1],
        secondBlocks: rateBlock?.block_rate[0][1],
      };
    }, [])
  );
}

export function useICP2CyclesCall() {
  const cyclesMintingService = new CyclesMintingService();
  return useCallsData(cyclesMintingService.getIcpToCyclesConversionRate);
}

export async function sendICP(to, amount, identity, memo) {
  if (!identity) return [];

  const serviceApi = await ServiceApi.create(identity);

  try {
    const res = await serviceApi.sendICP(identity, {
      amount: BigInt(amount),
      to,
      fromSubAccountId: null,
    });

    return {
      status: true,
      message: "Transfer Successfully",
      data: res,
    };
  } catch (e) {
    console.error(e);
    const _err = e.toString();
    const errorMessage = _err.includes(
      "You have tried to spend more than the balance of your account"
    )
      ? "You have tried to spend more than the balance of your account"
      : "Transfer Failed";

    throw new Error(`Reject text: ${errorMessage}`);
  }
}
