import React from "react";
import { generateAuthCardToken } from "@/lib/generateAuthToken";
import { Invoice, Subscriber } from "@/types/SmartISP";
import { CardPayResponse, CardPaymentOrderData } from "@/types/PaymentCard";
import { TokenizeCardResponse } from "@/types/Paymentez";
import { useGlobalPaymentResponseContext } from "@/context/globalPaymentResponseContext";
import { SavePayment } from "@/api/Pocketbase";

function useCreateCardPayment(
  subscriber: Subscriber | null,
  invoice: Invoice | null,
  tokenizeCardData: TokenizeCardResponse | null
) {
  const { setGlobalCardPaymentResponse, setLoading } =
    useGlobalPaymentResponseContext();

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
      console.log(response);
      setGlobalCardPaymentResponse(response);
      setLoading(false);
      SavePayment({
        amount: data.order.amount,
        description: data.order.description,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        pay_method: "card",
        phone: data.user.phone,
        subscriber: data.user.id,
        transaction_id: response.transaction.id,
        transaction_status: response.transaction.status,
      });
    }
  };

  React.useEffect(() => {
    console.log(subscriber, invoice, tokenizeCardData);
    if (subscriber && invoice && tokenizeCardData?.card?.token) {
      const data: CardPaymentOrderData = {
        order: {
          amount: Number(invoice.total_pay),
          description: `Pago factura #${invoice.num_bill}`,
          dev_reference: invoice.num_bill,
          vat: 0,
          installments: 0,
          taxable_amount: 0,
          tax_percentage: 0,
        },
        user: {
          id: subscriber.user.id.toString(),
          first_name: subscriber.user.name,
          last_name: subscriber.user.name,
          email: subscriber.user.email,
          phone: subscriber.user.phone,
        },
        card: {
          token: tokenizeCardData.card?.token,
        },
      };
      createCardPayment(data);
    } else if (subscriber && invoice && tokenizeCardData?.error) {
      const token = tokenizeCardData.error.type.split(":")[1].trim();
      const data: CardPaymentOrderData = {
        order: {
          amount: Number(invoice.total_pay),
          description: `Pago factura #${invoice.num_bill}`,
          dev_reference: invoice.num_bill,
          vat: 0,
          installments: 0,
          taxable_amount: 0,
          tax_percentage: 0,
        },
        user: {
          id: subscriber.user.id.toString(),
          first_name: subscriber.user.name,
          last_name: subscriber.user.name,
          email: subscriber.user.email,
          phone: subscriber.user.phone,
        },
        card: {
          token: token,
        },
      };
      createCardPayment(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriber, tokenizeCardData?.card?.token, tokenizeCardData?.error]);
}

export { useCreateCardPayment };
