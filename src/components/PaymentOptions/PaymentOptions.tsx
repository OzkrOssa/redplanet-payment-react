import React from "react";
import { PayU } from "@/components/PaymentOptions";
import { Card } from "./Card";

function PaymentOptions() {
  return (
    <React.Fragment>
      <p className="mt-5 mb-10 text-xl font-medium">Métodos de pago</p>
      <div className="flex justify-center items-center">
        {/* PayU Component */}
        <PayU/>
        {/* Card Component */}
        <Card/>
        {/* Pse Component */}
      </div>
    </React.Fragment>
  );
}

export { PaymentOptions };
