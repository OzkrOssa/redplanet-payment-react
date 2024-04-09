import React from "react";
import { PayU, Card, Pse } from "@/components/PaymentOptions";

function PaymentOptions() {
  return (
    <React.Fragment>
      <p className="mb-10 text-xl font-medium">Métodos de pago</p>
      <div className="flex justify-center items-center">
        {/* PayU Component */}
        <PayU/>
        {/* Card Component */}
        <Card/>
        {/* Pse Component */}
        <Pse/>
      </div>
    </React.Fragment>
  );
}

export { PaymentOptions };
