import React from "react";
import { CardPayResponse } from "@/types/PaymentCard";
import { PsePayResponse } from "@/types/PaymentPse";

interface GlobalPaymentResponseProviderProps {
  children: React.ReactNode;
}

const GlobalPaymentResponseContext = React.createContext<{
  globalCardPaymentResponse: CardPayResponse | null;
  setGlobalCardPaymentResponse: React.Dispatch<
    React.SetStateAction<CardPayResponse | null>
  >;
  globalPsePaymentResponse: PsePayResponse | null;
  setGlobalPsePaymentResponse: React.Dispatch<
    React.SetStateAction<PsePayResponse | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  globalCardPaymentResponse: null,
  setGlobalCardPaymentResponse: () => {},
  globalPsePaymentResponse: null,
  setGlobalPsePaymentResponse: () => {},
  loading: false,
  setLoading: () => {},
});

export const GlobalPaymentResponseProvider: React.FC<
  GlobalPaymentResponseProviderProps
> = ({ children }) => {
  const [globalCardPaymentResponse, setGlobalCardPaymentResponse] = React.useState<
  CardPayResponse | null
  >(null);

  const [globalPsePaymentResponse, setGlobalPsePaymentResponse] = React.useState<
  PsePayResponse | null
  >(null);
  const [loading, setLoading] = React.useState(false);
  return (
    <GlobalPaymentResponseContext.Provider
      value={{
        globalCardPaymentResponse: globalCardPaymentResponse,
        setGlobalCardPaymentResponse: setGlobalCardPaymentResponse,
        globalPsePaymentResponse: globalPsePaymentResponse,
        setGlobalPsePaymentResponse: setGlobalPsePaymentResponse,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalPaymentResponseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalPaymentResponseContext = () =>
  React.useContext(GlobalPaymentResponseContext);
