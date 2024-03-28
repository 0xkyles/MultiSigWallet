import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSlicedAddress } from "@/lib/utils";
import useWalletStore from "@/stores/walletStore";
import { CopyIcon } from "@radix-ui/react-icons";

export function WalletInfo() {
  const { wallet } = useWalletStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet informations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <h6>Contract</h6>
            <p className="flex justify-between items-center text-sm">
              {getSlicedAddress(wallet.contractAddress)}
              <Button size="sm">
                <CopyIcon />
              </Button>
            </p>
          </div>
          <div className="space-y-1">
            <h6>Balance</h6>
            <p className="text-sm">{wallet.balance} $ETH</p>
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
                  <Button size="sm">
                    <CopyIcon />
                  </Button>
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
