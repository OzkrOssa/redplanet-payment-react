import { TokenizeCardResponse } from "@/types/Paymentez";
import React from "react";

interface PaymentezSdkResponseProviderProps {
  children: React.ReactNode;
}
const PaymentezSdkResponseContext = React.createContext<{
    tokenizeCardData: TokenizeCardResponse | null
    setTokenizeCardData: React.Dispatch<React.SetStateAction<TokenizeCardResponse | null>>;
}>({
    tokenizeCardData: null,
    setTokenizeCardData: () => {}
});

export const usePaymentezSdkResponseContext = () =>
  React.useContext(PaymentezSdkResponseContext);

export const PaymentezSdkResponseProvider: React.FC<
  PaymentezSdkResponseProviderProps
> = ({ children }) => {
    const [tokenizeCardData, setTokenizeCardData] = React.useState<TokenizeCardResponse | null>(null)
  return (
    <PaymentezSdkResponseContext.Provider value={{tokenizeCardData, setTokenizeCardData}}>
      {children}
    </PaymentezSdkResponseContext.Provider>
  );
};
