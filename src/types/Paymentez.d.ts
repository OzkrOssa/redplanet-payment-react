export type TokenizeData = {
    locale: "es";
    user: {
      id: string;
      email: string;
    };
    configuration: {
      default_country: "COL";
    };
  };
  
  interface SuccessTokenizeResponse {
    card: {
      number: string;
      bin: string;
      type: string;
      transaction_reference: string;
      status: string;
      token: string;
      expiry_year: string;
      expiry_month: string;
      origin: string;
      message: string;
    };
    error?: never;
  }
  
  interface FailedTokenizeResponse {
    card?: never;
    error: {
      type: string;
      help: string;
      description: string;
    };
  }
  
  export type TokenizeCardResponse =
    | SuccessTokenizeResponse
    | FailedTokenizeResponse;
  