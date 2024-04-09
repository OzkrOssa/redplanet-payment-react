import React from "react";
import { generateAuthCardToken } from "@/lib/generateAuthToken";
import { ApiResponse } from "@/types/ApiResponse";
import { CardPaymentOrderData } from "@/types/PaymentCard";
import { TokenizeCardResponse } from "@/types/Paymentez";
import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { GlobalPaymentResponse } from "@/types/globalPaymentResponse";

function useCreateCardPayment(apiResponse: ApiResponse | null, tokenizeCardData: TokenizeCardResponse | null ) {

  const { setGlobalPaymentResponse, setLoading } = useGlobalPaymentResponseContext();
  
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
      const response: GlobalPaymentResponse = await req.json();
      setGlobalPaymentResponse(response);
      setLoading(false);
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
