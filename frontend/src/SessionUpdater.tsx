import { useEffect } from "react";
import useWeb3Store from "./stores/web3Store";
import contractABI from "@/build/contracts/MultiSignatureWallet.json";
import { address as contractAddress } from "@/build/contracts/contract.json";

const SessionUpdater = () => {
  const {
    web3Session: { web3, account },
    update,
  } = useWeb3Store();

  useEffect(() => {
    if (web3) {
      const interval = setInterval(async () => {
        try {
          const accounts = await web3.eth.getAccounts();

          if (account != accounts[0]) {
            const contract = account
              ? new web3.eth.Contract(contractABI.abi, contractAddress, {
                  from: accounts[0],
                })
              : undefined;
            update({ web3, account: accounts[0], contract });
          }
        } catch (error) {
          console.log(error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [web3, account]);

  return null;
};

export default SessionUpdater;
