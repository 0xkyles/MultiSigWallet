import { useEffect } from "react";
import useWeb3Store from "./stores/web3Store";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";
import WalletService from "./service/WalletService";

const SessionUpdater = () => {
  const {
    web3Session: { web3, account },
    update,
  } = useWeb3Store();

  useEffect(() => {
    if (web3) {
      const stopInterval = WalletService.getActiveAccount(
        web3,
        async (error, result) => {
          if (result) {
            if (account != result) {
              const contract = result
                ? new web3.eth.Contract(contractABI.abi, contractAddress, {
                    from: result,
                  })
                : undefined;
              const balance = result
                ? Number(
                    web3.utils.fromWei(
                      await web3.eth.getBalance(result),
                      "ether"
                    )
                  )
                : 0;
              update({ web3, account: result, contract, balance });
              return;
            }

            console.log(error);
          }
        }
      );

      return stopInterval;
    }
  }, [web3, account]);

  return null;
};

export default SessionUpdater;
