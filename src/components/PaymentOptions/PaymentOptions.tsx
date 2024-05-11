import React from "react";
import { PayU, Card, Pse } from "@/components/PaymentOptions";
import { useSmartISPContext } from "@/context";

function PaymentOptions() {
  const { invoice } = useSmartISPContext();
  const isDisabled = invoice?.id === 0;
  return (
    <React.Fragment>
      <p className="mb-10 text-xl font-medium">Métodos de pago</p>
      <div className="flex justify-center items-center">
        {/* PayU Component */}
        <PayU isDisabled={isDisabled} />
        {/* Card Component */}
        <Card isDisabled={isDisabled} />
        {/* Pse Component */}
        <Pse isDisabled={isDisabled} />
      </div>
    </React.Fragment>
  );
}

export { PaymentOptions };
