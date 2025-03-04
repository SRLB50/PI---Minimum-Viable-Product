import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';

export function decrypt(encryptedText: string, iv: string, secret: string): string {
  try {
    const key = CryptoJS.enc.Hex.parse(secret);
    const ivParsed = CryptoJS.enc.Hex.parse(iv);

    const decrypted = CryptoJS.AES.decrypt(
      encryptedText, 
      key, 
      { 
        iv: ivParsed, 
        mode: CryptoJS.mode.CBC, 
        padding: CryptoJS.pad.Pkcs7 
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    return '';
  }
}

export const getApiUrl = () => {
  const encryptedApiUrl = Constants.expoConfig?.extra?.API_URL;
  const apiKey = Constants.expoConfig?.extra?.API_KEY;
  const apiIv = Constants.expoConfig?.extra?.API_IV;

  if (encryptedApiUrl && apiKey && apiIv) {
    return decrypt(encryptedApiUrl, apiIv, apiKey);
  }

  console.warn('URL da API não configurada corretamente');
  return ''; 
};