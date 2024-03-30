import WalletService from "@/service/WalletService";
import useWeb3Store from "@/stores/web3Store";
import { useState } from "react";

const useDeposit = (
  cleanup: () => void,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const {
    web3Session: { web3, account },
  } = useWeb3Store();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onDeposit = async (amount: string, unit: string) => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (Number(amount) <= 0) {
      setError("Can't deposit an unvalid amount");
      setLoading(false);
      return;
    }

    //@ts-ignore
    const depositAmount = web3.utils.toWei(amount, unit);

    try {
      const receipt = await WalletService.depositToContract(
        web3!,
        account!,
        depositAmount
      );

      setSuccess(`Successfully deposited ${amount} ${unit}`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log(error);
      setError("Error while depositing eth.");
    } finally {
      setLoading(false);
      cleanup();
    }
  };

  return { onDeposit, setSuccess, success, error, loading };
};

export default useDeposit;
