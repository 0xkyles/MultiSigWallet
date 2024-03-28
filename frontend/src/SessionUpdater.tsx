import { useEffect } from "react";
import useWeb3Store from "./stores/web3Store";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";
import Web3Service from "./service/Web3Service";

const SessionUpdater = () => {
  const {
    web3Session: { web3, account },
    update,
  } = useWeb3Store();

  // checks if the user changes account, will run when user logs for the first time
  useEffect(() => {
    if (web3) {
      const stopInterval = Web3Service.getActiveAccount(
        web3,
        async (error, activeAccount) => {
          if (activeAccount !== null) {
            // Current account has changed
            if (account != activeAccount) {
              const contract = activeAccount
                ? new web3.eth.Contract(contractABI.abi, contractAddress, {
                    from: activeAccount,
                  })
                : undefined;
              const balance = activeAccount
                ? Number(
                    web3.utils.fromWei(
                      await web3.eth.getBalance(activeAccount),
                      "ether"
                    )
                  )
                : undefined;

              update({ web3, account: activeAccount, contract, balance });
              return;
            }
          }

          if (error) {
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
