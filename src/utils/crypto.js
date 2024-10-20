const CryptoJS = require("crypto-js");

const privateKey = process.env.PRIVATE_KEY ?? 'Hello123'

export function encrypt(id) {    
    const ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(id), privateKey).toString());    
    return ciphertext;
}

export function decrypt(encryptedId) {  
    const bytes  = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), privateKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));    
    return decryptedData;
}
