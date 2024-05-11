import React from "react";
import { PaymentOptions } from "@/components/PaymentOptions";
import { useGlobalPaymentResponseContext, useSmartISPContext } from "@/context";
import { TailSpin } from "react-loader-spinner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Invoice, Subscriber } from "@/types/SmartISP";

function SearchResults({ data }: { data: Subscriber | null }) {
  const { globalCardPaymentResponse, globalPsePaymentResponse, loading } =
    useGlobalPaymentResponseContext();
  
    const {setInvoice} = useSmartISPContext();

    const handleChange = (value: string) => {
      const invoice: Invoice = JSON.parse(value);
      setInvoice(invoice)
    };

  React.useEffect(() => {
    // Verifica si globalPaymentResponse existe y su estado es "pending"
    if (
      globalPsePaymentResponse &&
      globalPsePaymentResponse.transaction.status === "pending"
    ) {
      window.location.href = globalPsePaymentResponse.transaction.bank_url;
    }
  }, [globalPsePaymentResponse]);

  return (
    <React.Fragment>
      {data ? (
        <>
          <h2 className="text-xl font-semibold mb-2 text-center">
            {data.user.name}
          </h2>
          <RadioGroup onValueChange={handleChange}>
            {data.user.invoices.filter(invoice => invoice.status !== 1).map((invoice) => {
              return (
                <div
                  key={invoice.id}
                  className="flex items-center space-x-2 bg-gray-100 rounded-lg p-4 shadow-md text-sm"
                >
                  <RadioGroupItem
                    value={JSON.stringify(invoice)}
                    id={invoice.num_bill}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600">Número de Factura:</p>
                      <p className="font-semibold">{invoice.num_bill}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total a Pagar:</p>
                      <p className="font-semibold">${invoice.total_pay}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Pagar Antes:</p>
                      <p className="font-semibold">{invoice.expiration_date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          <div className="m-5 flex flex-col items-center">
            {loading && (
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="#5e1774"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            )}

            {globalCardPaymentResponse &&
              (globalCardPaymentResponse?.transaction.status !== "success" ? (
                // Si el estado no es "approved"
                <Alert className="text-xl">
                  <AlertTitle>Pago procesado sin exito</AlertTitle>
                  <AlertDescription>
                    <div className="flex justify-evenly p-2">
                      <p>Estado del pago: </p>
                      <Badge variant={"outline"} className="bg-red-500">
                        {globalCardPaymentResponse?.transaction.status}
                      </Badge>
                    </div>
                    <div className="flex justify-evenly">
                      ID del pago:
                      <Badge variant={"outline"}>
                        {globalCardPaymentResponse?.transaction.id}
                      </Badge>
                    </div>
                    <p>Contacte con el area de facturación</p>
                  </AlertDescription>
                </Alert>
              ) : (
                // Si el estado es "approved"
                <Alert className="text-xl">
                  <AlertTitle>Pago procesado con exito</AlertTitle>
                  <AlertDescription>
                    <div className="flex justify-evenly p-2">
                      <p>Estado del pago: </p>
                      <Badge variant={"outline"} className="bg-green-400">
                        {globalCardPaymentResponse?.transaction.status}
                      </Badge>
                    </div>
                    <div className="flex justify-evenly">
                      ID del pago:
                      <Badge variant={"outline"}>
                        {globalCardPaymentResponse?.transaction.id}
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
          <PaymentOptions />
        </>
      ) : (
        <div className="text-3xl font-semibold text-red-500 mt-10 ">
          Información no encontrada
        </div>
      )}
    </React.Fragment>
  );
}

export default SearchResults;
