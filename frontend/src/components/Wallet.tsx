import useWeb3Store from "@/stores/web3Store";
import AccountBanner from "./AccountBanner";

const Wallet = () => {
  const { web3Session } = useWeb3Store();

  return <AccountBanner web3Session={web3Session} />;
};

export default Wallet;
