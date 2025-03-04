const fs = require('fs');
const dotenv = require('dotenv');
const CryptoJS = require('crypto-js');

dotenv.config();

function encrypt(text, secret) {
  const key = CryptoJS.lib.WordArray.random(32);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(text, key, { 
    iv: iv, 
    mode: CryptoJS.mode.CBC, 
    padding: CryptoJS.pad.Pkcs7 
  });

  return {
    encrypted: encrypted.toString(),
    key: key.toString(),
    iv: iv.toString()
  };
}

const appConfigPath = './app.json';
const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));

const { encrypted: encryptedApiUrl, key, iv } = encrypt(process.env.API_URL, process.env.SECRET_KEY);

if (!appConfig.expo.extra) {
  appConfig.expo.extra = {};
}
appConfig.expo.extra.API_URL = encryptedApiUrl;
appConfig.expo.extra.API_KEY = key;
appConfig.expo.extra.API_IV = iv;

fs.writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2));
console.log('API_URL criptografada');