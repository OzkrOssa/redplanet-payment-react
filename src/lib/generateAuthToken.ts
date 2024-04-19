import { SHA256, enc } from "crypto-js";

export function generateAuthCardToken() {
  const serverApiCode = import.meta.env.VITE_SERVER_CARD_APPCODE
  const serverApiKey = import.meta.env.VITE_SERVER_CARD_APPKEY
  const unixTimestamp = Math.floor(Date.now() / 1000).toString();
  const tokenString = serverApiKey + unixTimestamp;

  // Calcula el hash SHA-256 y conviértelo en una cadena hexadecimal
  const tokenHash = SHA256(tokenString).toString(enc.Hex);

  // Crea el token de autenticación
  const authToken = btoa(
    `${serverApiCode};${unixTimestamp};${tokenHash}`
  );

  return authToken;
}

export function generateAuthPSEToken() {
  const serverApiCode = import.meta.env.VITE_SERVER_PSE_APPCODE
  const serverApiKey = import.meta.env.VITE_SERVER_PSE_APPKEY
  const unixTimestamp = Math.floor(Date.now() / 1000).toString();
  const tokenString = serverApiKey + unixTimestamp;

  // Calcula el hash SHA-256 y conviértelo en una cadena hexadecimal
  const tokenHash = SHA256(tokenString).toString(enc.Hex);

  // Crea el token de autenticación
  const authToken = btoa(
    `${serverApiCode};${unixTimestamp};${tokenHash}`
  );

  return authToken;
}