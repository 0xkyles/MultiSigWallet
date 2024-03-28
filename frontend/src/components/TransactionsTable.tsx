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

const TransactionsTable = () => {
  return (
    <Table className="bg-white shadow-lg">
      <TableCaption>A list of the recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>txID</TableHead>
          <TableHead>Proposer</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Approvals</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead className="text-right ">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>
            {getSlicedAddress("0x066651EbA7DdD20971fb2e2b4B2Fb0905B07f975")}
          </TableCell>
          <TableCell>
            {getSlicedAddress("0x066651EbA7DdD20971fb2e2b4B2Fb0905B07f975")}
          </TableCell>
          <TableCell>1 $eth</TableCell>
          <TableCell>-</TableCell>
          <TableCell>2 approvals</TableCell>
          <TableCell>false</TableCell>
          <TableCell className="text-right flex gap-2">
            <Button size="sm" variant="outline">
              Approve
            </Button>
            <Button size="sm" variant="destructive">
              execute
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
