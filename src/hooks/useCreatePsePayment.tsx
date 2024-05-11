import { SavePayment } from "@/api/Pocketbase";
import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { generateAuthPSEToken } from "@/lib/generateAuthToken";
import { Subscriber } from "@/types/SmartISP";
import { PaymentDataPse, PsePayResponse } from "@/types/PaymentPse";

function useCreatePsePayment(subscriber: Subscriber | null) {
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
    console.log(response)
    setGlobalPsePaymentResponse(response);
    setLoading(false);
    if (subscriber){
      SavePayment({
        amount: psePaymentData.order.amount,
        description: psePaymentData.order.description,
        email: psePaymentData.user.email,
        first_name: subscriber.user.name,
        last_name: subscriber.user.name,
        pay_method:"pse",
        phone:subscriber.user.phone,
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
