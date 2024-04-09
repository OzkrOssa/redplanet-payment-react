import React from "react";
import { GlobalPaymentResponse } from "@/types/globalPaymentResponse";

interface GlobalPaymentResponseProviderProps {
  children: React.ReactNode;
}

const GlobalPaymentResponseContext = React.createContext<{
  globalPaymentResponse: GlobalPaymentResponse | null;
  setGlobalPaymentResponse: React.Dispatch<
    React.SetStateAction<GlobalPaymentResponse | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  globalPaymentResponse: null,
  setGlobalPaymentResponse: () => {},
  loading: false,
  setLoading: () => {},
});

export const GlobalPaymentResponseProvider: React.FC<
  GlobalPaymentResponseProviderProps
> = ({ children }) => {
  const [globalPaymentResponse, setGlobalPaymentResponse] = React.useState<
  GlobalPaymentResponse | null
  >(null);
  const [loading, setLoading] = React.useState(false);
  return (
    <GlobalPaymentResponseContext.Provider
      value={{
        globalPaymentResponse,
        setGlobalPaymentResponse,
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
