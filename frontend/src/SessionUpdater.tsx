import { useEffect } from "react";
import useWeb3Store from "./stores/web3Store";

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
            update({ web3, account: accounts[0] });
          }
        } catch (error) {
          console.log(error);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [account]);

  return null;
};

export default SessionUpdater;
