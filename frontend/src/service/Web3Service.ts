import Web3 from "web3";

class Web3Service {
  getActiveAccount = (
    web3: Web3,
    callback: (error: any | null, result: string | null) => void
  ) => {
    const interval = setInterval(async () => {
      try {
        const accounts = await web3.eth.getAccounts();

        await callback(null, accounts[0]);
      } catch (error) {
        callback(error, null);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  // to be redone
  getCurrentNetwork = async (web3: Web3) => {
    const result: number = Number(await web3.eth.net.getId());
    let network: string;
    switch (result) {
      case 1:
        network = "Mainnet";
        break;
      case 2:
        network = "Morden testnet";
        break;
      case 3:
        network = "Ropsten testnet";
        break;
      case 5777:
        network = "Dev";
        break;
      default:
        network = "unknown net";
    }

    return network;
  };
}

export default new Web3Service();
