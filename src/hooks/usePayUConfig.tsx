import React from "react";
import { MD5 } from "crypto-js";
import { ApiResponse } from "@/types/ApiResponse";

type PayUConfig = {
  apiKey: string;
  merchantID: string;
  accountID: string;
}

function usePayUConfig(apiResponse: ApiResponse | null) {
  const [signature, setSignature] = React.useState("");
  const payUConfig: PayUConfig = {
    apiKey:"",
    accountID:"",
    merchantID:""
  }

  React.useEffect(() => {
    if (apiResponse) {
      const message = `${payUConfig.apiKey}~${payUConfig.merchantID}~${apiResponse.bill_number}~${apiResponse.total_pay}~COP`;
      const hash = MD5(message).toString();
      setSignature(hash);
    }
  }, [apiResponse, payUConfig.apiKey, payUConfig.merchantID]);
  return {
    signature,
    payUConfig
  };
}

export { usePayUConfig };
