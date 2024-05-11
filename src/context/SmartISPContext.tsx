"use client";
import { Subscriber, Invoice } from "@/types/SmartISP";
import React from "react";

interface SmartISPProviderProps {
  children: React.ReactNode;
}

const SmartISPIContext = React.createContext<{
  subscriber: Subscriber | null;
  invoice: Invoice | null;
  setSubscriber: React.Dispatch<React.SetStateAction<Subscriber | null>>;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>;
}>({
  subscriber: null,
  invoice: null,
  setSubscriber: () => {},
  setInvoice: () => {},
});

export const SmartISPProvider: React.FC<SmartISPProviderProps> = ({
  children,
}) => {
  const [subscriber, setSubscriber] = React.useState<Subscriber | null>(null);

  const [invoice, setInvoice] = React.useState<Invoice | null>({
    id: 0,
    num_bill: "",
    period: "",
    release_date: "",
    expiration_date: "",
    iva: "",
    cost: "",
    total_pay: "",
    actual_total_pay: null,
    status: 0,
    client_id: 0,
    service_id: null,
    open: 0,
    created_at: "",
    updated_at: "",
    note: null,
    memo: null,
    xero_id: null,
    paid_on: null,
    start_date: "",
    use_transactions: "",
    billing_type: "",
    recurring_invoice: "",
    cortado_date: "",
    csv_generated: 0,
    payment_id: null,
  });

  return (
    <SmartISPIContext.Provider
      value={{
        subscriber: subscriber,
        setSubscriber: setSubscriber,
        invoice: invoice,
        setInvoice: setInvoice,
      }}
    >
      {children}
    </SmartISPIContext.Provider>
  );
};

export const useSmartISPContext = () => React.useContext(SmartISPIContext);
