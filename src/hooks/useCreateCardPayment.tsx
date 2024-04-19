import React from "react";
import { generateAuthCardToken } from "@/lib/generateAuthToken";
import { ApiResponse } from "@/types/ApiResponse";
import { CardPayResponse, CardPaymentOrderData } from "@/types/PaymentCard";
import { TokenizeCardResponse } from "@/types/Paymentez";
import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { SavePayment } from "@/api/Pocketbase";

function useCreateCardPayment(apiResponse: ApiResponse | null, tokenizeCardData: TokenizeCardResponse | null ) {

  const { setGlobalCardPaymentResponse, setLoading } = useGlobalPaymentResponseContext();
  
  const createCardPayment = async (data: CardPaymentOrderData) => {
    if (data) {
      setLoading(true);
      const token = generateAuthCardToken();
      const req = await fetch(
        `https://ccapi-stg.paymentez.com/v2/transaction/debit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": token,
          },
          body: JSON.stringify(data),
        }
      );

      if (!req.ok) {
        console.log("error");
      }
      const response: CardPayResponse = await req.json();
      console.log(response)
      setGlobalCardPaymentResponse(response);
      setLoading(false);
      SavePayment({
        amount: data.order.amount,
        description: data.order.description,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        pay_method:"card",
        phone:data.user.phone,
        subscriber: data.user.id,
        transaction_id: response.transaction.id,
        transaction_status: response.transaction.status
      })
    }
  };

  React.useEffect(() => {
    if (apiResponse && tokenizeCardData?.card?.token) {
      const data: CardPaymentOrderData = {
        order: {
          amount: apiResponse.total_pay,
          description: `Pago factura #${apiResponse.bill_number}`,
          dev_reference: apiResponse.bill_number.toString(),
          vat: 0,
          installments: 0,
          taxable_amount: 0,
          tax_percentage: 0,
        },
        //TODO:add last_name property
        user: {
          id: apiResponse.subscriber,
          first_name: apiResponse.client_name,
          last_name: apiResponse.client_name,
          email: apiResponse.email,
          phone: apiResponse.phone,
        },
        card: {
          token: tokenizeCardData.card?.token,
        },
      };
      createCardPayment(data);
    } else if (apiResponse && tokenizeCardData?.error) {
      const token = tokenizeCardData.error.type.split(":")[1].trim()
      const data: CardPaymentOrderData = {
        order: {
          amount: apiResponse.total_pay,
          description: `Pago factura #${apiResponse.bill_number}`,
          dev_reference: apiResponse.bill_number.toString(),
          vat: 0,
          installments: 0,
          taxable_amount: 0,
          tax_percentage: 0,
        },
        //TODO:add last_name property
        user: {
          id: apiResponse.subscriber,
          first_name: apiResponse.client_name,
          last_name: apiResponse.client_name,
          email: apiResponse.email,
          phone: apiResponse.phone,
        },
        card: {
          token: token,
        },
      };
      createCardPayment(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse, tokenizeCardData?.card?.token, tokenizeCardData?.error]);
}

export { useCreateCardPayment };
