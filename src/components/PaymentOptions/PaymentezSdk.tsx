import React from "react";
import { Button } from "@/components/ui";
import { TokenizeCardResponse, TokenizeData } from "@/types/Paymentez";
import { useApiResponseContext } from "@/context";

export default function PaymentezSdk({
  setShowModal,
  responseRecived,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  responseRecived: React.Dispatch<
    React.SetStateAction<TokenizeCardResponse | null>
  >;
}) {
  const [paymentezSDK, setPaymentezSDK] = React.useState(null);
  const [notCompleteForm, setNotCompleteForm] = React.useState("");
  const [textSubmitButton, setTextSubmitButton] = React.useState("Pagar");
  const { apiResponse } = useApiResponseContext();

  //TODO: refactor this, i guess can add to conext
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.paymentez.com/ccapi/sdk/payment_sdk_stable.min.js";
    script.async = true;

    script.onload = () => {
      initializePaymentForm();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializePaymentForm = () => {
    if (apiResponse) {
      const tokenizeData: TokenizeData = {
        locale: "es",
        user: {
          email: apiResponse.email,
          id: apiResponse.subscriber,
        },
        configuration: {
          default_country: "COL",
        },
      };

      const paymentGatewayConfig = {
        environment: import.meta.env.VITE_PAYMENTEZ_ENVIRONMENT,
        clientAppCode: import.meta.env.VITE_PAYMENTEZ_CLIENT_APP_CODE,
        clientAppKey: import.meta.env.VITE_PAYMENTEZ_CLIENT_APP_KEY,
      };

      // @ts-expect-error: exteral library
      const paymentez = new PaymentGateway(
        paymentGatewayConfig.environment,
        paymentGatewayConfig.clientAppCode,
        paymentGatewayConfig.clientAppKey
      );

      setPaymentezSDK(paymentez);

      if (paymentez) {
        const notCompletedFormCallback = (message: string) => {
          setNotCompleteForm(
            `Not completed form: ${message}, Please fill required data`
          );
        };

        const responseCallback = (response: TokenizeCardResponse) => {
          responseRecived(response);
          setShowModal(false);
          setTextSubmitButton("Pagar");
        };

        paymentez.generate_tokenize(
          tokenizeData,
          "#tokenize_form",
          responseCallback,
          notCompletedFormCallback
        );
      }
    }
  };

  const handleTokenize = () => {
    setNotCompleteForm("");
    setTextSubmitButton("Procesando targeta...");
    // @ts-expect-error: external
    paymentezSDK.tokenize();
  };
  return (
    <React.Fragment>
      <div id="tokenize_form"></div>
      {notCompleteForm ? (
        <Button onClick={handleTokenize} variant={"outline"} className="w-full">
          Internar nuevamente
        </Button>
      ) : (
        <Button onClick={handleTokenize} variant={"outline"} className="w-full">
          {textSubmitButton}
        </Button>
      )}
    </React.Fragment>
  );
}
