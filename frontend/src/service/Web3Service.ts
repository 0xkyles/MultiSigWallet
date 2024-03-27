import Web3 from "web3";

class Web3Service {
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
      default:
        network = "Private net";
    }

    return network;
  };
}

export default new Web3Service();
