import React from "react";
import { MD5 } from "crypto-js";
import { ApiResponse } from "@/types/ApiResponse";

function useSignaturePayU(apiResponse: ApiResponse | null) {
  const [signature, setSignature] = React.useState("");

  React.useEffect(() => {
    const config = {
      apiKey: "",
      merchantID:""
    }
    
    if (apiResponse) {
      const message = `${config.apiKey}~${config.merchantID}~${
        apiResponse.bill_number
      }~${apiResponse.total_pay}~COP`;
      console.log(message);
      const hash = MD5(message).toString();
      setSignature(hash);
    }
  }, [apiResponse]);
  return {
    signature,
  };
}

export { useSignaturePayU };
