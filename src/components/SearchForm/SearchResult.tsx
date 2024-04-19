import formatDate from "@/lib/formatDate";
import { ApiResponse } from "@/types/ApiResponse";
import React from "react";
import { PaymentOptions } from "@/components/PaymentOptions";
import { useGlobalPaymentResponseContext } from "@/context";
import { TailSpin } from "react-loader-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

function SearchResults({ data }: { data: ApiResponse }) {
  const { globalCardPaymentResponse, globalPsePaymentResponse, loading } =
    useGlobalPaymentResponseContext();


  React.useEffect(() => {
    // Verifica si globalPaymentResponse existe y su estado es "pending"
    if (
      globalPsePaymentResponse &&
      globalPsePaymentResponse.transaction.status === "pending"
    ) {
      window.location.href = globalPsePaymentResponse.transaction.bank_url
    }
  }, [globalPsePaymentResponse]);

  return (
    <React.Fragment>
      {data.bill_number ? (
        <>
          <div className="bg-gray-100 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Información de Pago
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Nombre del Cliente:</p>
                <p className="font-semibold">{data.client_name}</p>
              </div>
              <div>
                <p className="text-gray-600">Número de Factura:</p>
                <p className="font-semibold">{data.bill_number.toString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Total a Pagar:</p>
                <p className="font-semibold">${data.total_pay.toString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Fecha de Pago:</p>
                <p className="font-semibold">
                  {formatDate(data.expiration_date)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Estado:</p>
                <p className="font-semibold">{data.status}</p>
              </div>
              <div>
                <p className="text-gray-600">Estado del servicio:</p>
                <p className="font-semibold">{data.service_status}</p>
              </div>
            </div>
          </div>
          <div className="m-10 flex flex-col items-center">
            {/* Spinner de carga */}
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

            {/* Renderizar la alerta según la respuesta del pago */}
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
