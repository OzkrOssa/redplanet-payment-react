# Red Planet Online Payment

This project provide a easy way to pay red planet services via PAYU, Credit/Debit Card and PSE

## Configuration

### API Client

To configure the API token, navigate to the `ApiClient` file located at `/src/api/ApiClient`.

```javascript
const token = "YOUR_ACCESS_TOKEN";
```

### Auth Token

Depending on your payment method (Card or PSE), you'll need to configure the API code and API key provided by `Paymentez/Nuvei`. These keys are used to generate the authentication token for inclusion in the request header.

```typescript
import { generateAuthCardToken, generateAuthPSEToken } from "@/lib/generateAuthToken";

// For Card
const apiCodeCard = "YOUR_API_CODE_CARD";
const apiKeyCard = "YOUR_API_KEY_CARD";
const authTokenCard = generateAuthCardToken(apiCodeCard, apiKeyCard);

// For PSE
const apiCodePse = "YOUR_API_CODE_PSE";
const apiKeyPse = "YOUR_API_KEY_PSE";
const authTokenPse = generateAuthPSEToken(apiCodePse, apiKeyPse);
```

### Paymentez SDK

Navigate to the `PaymentezSdk` file located at `/src/component/PaymentOptions/PaymentezSdk.tsx`. You'll need to configure the environment, client app code, and key. These keys are provided by Paymentez or Nuvei. This configuration is specifically for tokenizing the card used for payment.

```typescript
const paymentGatewayConfig = {
  environment: "YOUR_ENVIRONMET",
  clientAppCode: "YOUR_CLIENT_APPCODE",
  clientAppKey: "YOUR_CLIENT_APPKEY",
};

const paymentez = new PaymentGateway(
  paymentGatewayConfig.environment,
  paymentGatewayConfig.clientAppCode,
  paymentGatewayConfig.clientAppKey
);
```

### PayU

Navigate to file located at `/src/hooks/usePayUConfig`. You'll need to configure `merchantID`, `accountID` and `apiKey` provided by PayU.

```typescript
const payUConfig: PayUConfig = {
  apiKey: "PAYU_APIKEY",
  accountID: "PAYU_ACCOUNT_ID",
  merchantID: "PAYU_MERCHANT_ID",
};
```
