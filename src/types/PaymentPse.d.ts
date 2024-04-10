type Order = {
  dev_reference: string;
  amount: number;
  vat?: number;
  description: string;
  country?: string;
  currency?: string;
};

type CarrierData = {
    id: string;
    extra_params: CarrierExtraParams;
  };
  
  type UserData = {
    id: string;
    email: string;
    phone_number?: string;
    address?: Address;
  };
  
  export type PaymentDataPse = {
    carrier: CarrierData;
    user: UserData;
    order: Order;
  };

  type PsePayResponse = {
    application: {
      code: string;
    };
    commerce: {
      merchant_id: string;
    };
    user: {
      name: string;
      email: string;
      id: string;
    };
    transaction: {
      currency: string;
      country: string;
      dev_reference: string;
      amount: number;
      paid_date: string | null;
      description: string;
      status: string;
      id: string;
      bank_url: string;
      status_bank: string;
      trazability_code: number;
      ticket_id: number;
      pse_cycle: string;
    };
  };
  