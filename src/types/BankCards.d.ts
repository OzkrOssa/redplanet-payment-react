type BankCard = {
  bin: string;
  status: "review" | "valid" | "pending" | "rejected";
  token: string;
  holder_name: string;
  expiry_year: string;
  expiry_month: string;
  transaction_reference: string | null;
  type:
    | "vi"
    | "mc"
    | "ax"
    | "di"
    | "dc"
    | "ms"
    | "ex"
    | "ak"
    | "cd"
    | "sx"
    | "ol"
    | "ep"
    | "csd"
    | "bbva";
  number: string;
};

type BankCardListResponse = {
  cards: BankCard[];
  result_size: number;
};
