import React from "react";
import { PayU } from "@/components/PaymentOptions";

function PaymentOptions() {
  return (
    <React.Fragment>
      <p className="mt-5 mb-10 text-xl font-medium">Métodos de pago</p>
      <div className="flex justify-center items-center">
        {/* PayU Component */}
        <PayU/>
        {/* Card Component */}
        
        {/* Pse Component */}
      </div>
    </React.Fragment>
  );
}

export { PaymentOptions };
