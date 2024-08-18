import CryptoJS from "crypto-js";
import { createTransform } from "redux-persist";

// Replace this with your own secret key, and keep it secure
const secretKey = import.meta.env.VITE_SECRET_KEY;

const encryptTransform = createTransform(
  // Encrypt the state before storing it
  (inboundState) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      secretKey
    ).toString();
    return encrypted;
  },
  // Decrypt the state when rehydrated
  (outboundState) => {
    const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
  }
);

export default encryptTransform;
