import React from "react";
import payU from "@/assets/images/payu.png";
import { Button } from "@/components/ui";
import { useApiResponseContext } from "@/context/ApiResponseContext";
import { usePayUConfig } from "@/hooks/usePayUConfig";

function PayU() {
  const { apiResponse } = useApiResponseContext();
  const { signature, payUConfig } = usePayUConfig(apiResponse);

  //TODO: add confirmation url and response url
  return (
    <React.Fragment>
      {apiResponse && (
        <form
          method="post"
          action="https://checkout.payulatam.com/ppp-web-gateway-payu/"
        >  
        {/* ADD merchantId & accountId*/}
          <input name="merchantId" type="hidden" value={payUConfig.merchantID} />
          <input name="accountId" type="hidden" value={payUConfig.accountID} />
          <input
            name="description"
            type="hidden"
            value="Pago de Factura - Redplanet"
          />
          <input
            name="referenceCode"
            type="hidden"
            value={apiResponse.bill_number.toString()}
          />
          <input
            name="amount"
            type="hidden"
            value={apiResponse.total_pay.toString()}
          />
          <input name="tax" type="hidden" value="0" />
          <input name="taxReturnBase" type="hidden" value="0" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value={signature} />
          <input name="test" type="hidden" value="0" />
          <input name="buyerEmail" type="hidden" value={apiResponse.email} />
          <input
            name="responseUrl"
            type="hidden"
            value="https://thanks.red-planet.com.co/"
          />
          <input
            name="confirmationUrl"
            type="hidden"
            value="https://thanks.red-planet.com.co/"
          />
          <Button
            className="bg-transparent w-30 h-16"
            variant={"ghost"}
            type="submit"
          >
            <img
              src={payU}
              alt="logo payu"
              width={180}
              height={180}
              className="w-full h-full object-contain"
            />
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}

export { PayU };
