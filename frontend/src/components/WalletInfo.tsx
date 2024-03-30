import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSlicedAddress } from "@/lib/utils";
import { Wallet } from "@/stores/walletStore";
import { CopyIcon } from "@radix-ui/react-icons";
import Web3 from "web3";
import CopyButton from "./CopyButton";

interface Props {
  wallet: Wallet;
  web3: Web3;
}

export function WalletInfo({ wallet, web3 }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Wallet informations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <h6>Contract</h6>
            <p className="flex justify-between items-center text-sm">
              {getSlicedAddress(wallet.contractAddress)}
              <CopyButton value={wallet.contractAddress} />
            </p>
          </div>
          <div className="space-y-1">
            <h6>Balance</h6>
            <p className="text-sm">
              {web3.utils.fromWei(wallet.balance, "ether")} $ETH
            </p>
          </div>
          <div className="space-y-1">
            <h6>Approvals required</h6>
            <p className="text-sm">{wallet.approvalsRequired}</p>
          </div>
          <div className="space-y-1">
            <h6>Total transactions</h6>
            <p className="text-sm">{wallet.transactionsCount} transaction(s)</p>
          </div>
          <div className="space-y-1">
            <h6>Number of owners</h6>
            <p className="text-sm">{wallet.owners.length} owner(s)</p>
          </div>
          <div className="space-y-1">
            <h6>Owners</h6>
            <ul className="space-y-1">
              {wallet.owners.map((owner) => (
                <li
                  key={owner}
                  className="flex justify-between items-center text-sm"
                >
                  {getSlicedAddress(owner)}
                  <CopyButton value={owner} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WalletInfo;
