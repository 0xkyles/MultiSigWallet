interface DepositEvent {
  event: "Deposit";
  returnValues: {
    sender: string;
    value: number;
  };
}

export type Event = DepositEvent;
