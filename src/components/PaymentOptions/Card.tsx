import React from "react";
import CardImage from "@/assets/images/cards.png";
import { Button } from "@/components/ui";
import PaymentezSdk from "./PaymentezSdk";
import { X } from "lucide-react";
import { useApiResponseContext, useGlobalPaymentResponseContext, usePaymentezSdkResponseContext } from "@/context";
import { useCreateCardPayment } from "@/hooks";

function Card() {
  const [showModal, setShowModal] = React.useState(false);
  const { tokenizeCardData, setTokenizeCardData } = usePaymentezSdkResponseContext();
  const { apiResponse } = useApiResponseContext();
  useCreateCardPayment(apiResponse, tokenizeCardData)

  const { setGlobalPaymentResponse, setLoading } = useGlobalPaymentResponseContext();

  return (
    <React.Fragment>
      <div>
        <Button className="bg-transparent w-30 h-16" variant={"ghost"}>
          <img
            src={CardImage}
            alt="card logo"
            width={150}
            height={150}
            className="w-full h-full"
            onClick={() => {
              setShowModal(true);
              setTokenizeCardData(null)
              setGlobalPaymentResponse(null)
              setLoading(false)
            }}
          />
        </Button>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Fondo oscuro */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              {/* Contenido del modal */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* Encabezado del modal */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Paga con tu targeta
                    </h2>
                    <button
                      onClick={() => {
                        setShowModal(false);
                      }}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label="Cerrar modal"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mb-4">
                      <PaymentezSdk setShowModal={setShowModal} responseRecived={setTokenizeCardData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export { Card };
