import { SavePayment } from "@/api/Pocketbase";
import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { generateAuthPSEToken } from "@/lib/generateAuthToken";
import { ApiResponse } from "@/types/ApiResponse";
import { PaymentDataPse, PsePayResponse } from "@/types/PaymentPse";

function useCreatePsePayment(apiResponse: ApiResponse | null) {
  const { setGlobalPsePaymentResponse, setLoading } =
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

    const response: PsePayResponse = await request.json();
    setGlobalPsePaymentResponse(response);
    setLoading(false);
    if (apiResponse){
      SavePayment({
        amount: psePaymentData.order.amount,
        description: psePaymentData.order.description,
        email: psePaymentData.user.email,
        first_name: apiResponse.client_name,
        last_name: apiResponse.client_name,
        pay_method:"pse",
        phone:apiResponse.phone,
        subscriber: psePaymentData.user.id,
        transaction_id: response.transaction.id,
        transaction_status: response.transaction.status
      })
    }
  };

  return {
    sendPayOrder,
  };
}

export { useCreatePsePayment };
