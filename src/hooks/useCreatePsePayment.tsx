import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { generateAuthPSEToken } from "@/lib/generateAuthToken";
import { PaymentDataPse } from "@/types/PaymentPse";
import { GlobalPaymentResponse } from "@/types/globalPaymentResponse";

function useCreatePsePayment() {
  const { setGlobalPaymentResponse, setLoading } =
    useGlobalPaymentResponseContext();
  const sendPayOrder = async (psePaymentData: PaymentDataPse) => {
    setLoading(true);
    const token = generateAuthPSEToken();
    const request = await fetch("https://noccapi-stg.paymentez.com/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": token,
      },
      body: JSON.stringify(psePaymentData),
    });

    if (!request.ok) {
      //TODO: handle response error
      console.log(request);
    }

    const response: GlobalPaymentResponse = await request.json();
    setGlobalPaymentResponse(response);
    setLoading(false);
  };

  return {
    sendPayOrder,
  };
}

export { useCreatePsePayment };
