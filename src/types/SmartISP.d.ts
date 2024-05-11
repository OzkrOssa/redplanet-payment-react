export type Invoice = {
  id: number;
  num_bill: string;
  period: string;
  release_date: string;
  expiration_date: string;
  iva: string;
  cost: string;
  total_pay: string;
  actual_total_pay: string | null;
  status: number;
  client_id: number;
  service_id: number | null;
  open: number;
  created_at: string;
  updated_at: string;
  note: string | null;
  memo: string | null;
  xero_id: string | null;
  paid_on: string | null;
  start_date: string;
  use_transactions: string;
  billing_type: string | null;
  recurring_invoice: string;
  cortado_date: string;
  csv_generated: number;
  payment_id: string | null;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: null;
  photo: string;
  dni: string;
  dv: string | null;
  custom_token_nuvai: string | null;
  password: string;
  created_at: string;
  updated_at: string | null;
  balance: string;
  odb_id: string | null;
  onu_id: string | null;
  port: string | null;
  onusn: string | null;
  zona_id: string | null;
  type_document_identification_id: number;
  type_organization_id: number;
  municipality_id: number;
  type_liability_id: number;
  type_regime_id: number;
  merchant_registration: string | null;
  adjustable_amount: string;
  id_punto_emision: string | null;
  wallet_balance: number;
  map_marker_icon: string[];
  odb_geo_json: string[];
  odb_geo_json_styles: string[];
  subscriber_no: string;
  electronic_invoice: string;
  invoices: Invoice[];
  invoices_sunat: string[];
};

type InvoicesContainer = {
  invoices_smartISP: Invoice[];
  invoices_sunat: string[];
};

export type Subscriber = {
  user: User;
  invoices: InvoicesContainer;
};