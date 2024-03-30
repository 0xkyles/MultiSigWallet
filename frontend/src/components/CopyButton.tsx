import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
  value: string;
}

const CopyButton = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = async (address: string) => {
    setIsCopied(true);
    await navigator.clipboard.writeText(address);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  return (
    <Button
      onClick={() => copyAddress(value)}
      className={isCopied ? "bg-primary/40" : ""}
      size="sm"
    >
      <CopyIcon />
    </Button>
  );
};

export default CopyButton;
