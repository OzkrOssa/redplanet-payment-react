import formatDate from "@/lib/formatDate";
import { ApiResponse } from "@/types/ApiResponse";
import React from "react";
import { PaymentOptions } from "@/components/PaymentOptions";

function SearchResults({ data }: { data: ApiResponse }) {
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
          <PaymentOptions/>
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
