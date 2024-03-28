import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSlicedAddress } from "@/lib/utils";
import { Button } from "./ui/button";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Transaction } from "@/stores/walletStore";

interface Props {
  transactions: Transaction[];
  approvalsByAccount: boolean[];
  approvalsRequired: number;
}

const TransactionsTable = ({
  transactions,
  approvalsByAccount,
  approvalsRequired,
}: Props) => {
  if (transactions.length == 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-sm shadow-lg">No transactions found.</p>
      </div>
    );
  }

  return (
    <Table className="bg-white shadow-lg">
      <TableCaption>A list of the recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>txID</TableHead>
          <TableHead>Proposer</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Approvals</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right ">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, txID) => (
          <TableRow>
            <TableCell className="font-medium">{txID}</TableCell>
            <TableCell>{getSlicedAddress(transaction.proposer)}</TableCell>
            <TableCell>{getSlicedAddress(transaction.to)}</TableCell>
            <TableCell>{transaction.value} $ETH</TableCell>
            <TableCell>{transaction.numOfApprovals} approvals</TableCell>
            <TableCell>
              {transaction.complete ? (
                <CheckIcon className="w-4 h-4 bg-emerald-500 text-white rounded" />
              ) : (
                <Cross2Icon className="w-4 h-4 bg-red-500 text-white rounded" />
              )}
            </TableCell>
            <TableCell className="flex gap-2 justify-end">
              {!approvalsByAccount[txID] && (
                <Button size="sm" variant="default">
                  Approve
                </Button>
              )}
              {approvalsByAccount[txID] && (
                <Button size="sm" variant="outline">
                  Revoke approval
                </Button>
              )}
              {transaction.numOfApprovals >= approvalsRequired && (
                <Button size="sm" variant="destructive">
                  execute
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
