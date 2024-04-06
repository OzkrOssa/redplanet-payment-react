type TransactionData = {
    id: string;
    status: string;
    current_status: string;
    status_detail: number;
    payment_date: string;
    amount: number;
    installments: number;
    carrier_code: string;
    message: string;
    authorization_code: string;
    dev_reference: string;
    carrier: string;
    product_description: string;
    payment_method_type: string;
  };
  
  type CardDataResponse = {
    number: string;
    bin: string;
    type: string;
    transaction_reference: string;
    status: string;
    token: string;
    expiry_year: string;
    expiry_month: string;
    origin: string;
  };
  
  export type CardPayResponse = {
    transaction: TransactionData;
    card: CardDataResponse;
  };
  
  type OrderData = {
    amount: number;
    description: string;
    dev_reference: string;
    vat: number;
    installments: number;
    taxable_amount: number;
    tax_percentage: number;
  };
  
  type UserData = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  
  type CardData = {
    token?: string;
  };
  
  export type CardPaymentOrderData = {
    order: OrderData;
    user: UserData;
    card: CardData;
  };
  