
import * as CryptoJS from 'crypto-js'
// let key = CryptoJS.enc.Utf8.parse('5ffF03b858D5Fd16');

// let timestemp = Date.parse(new Date()) + "000";

// var iv = CryptoJS.enc.Utf8.parse(timestemp);
// console.log('iv####', timestemp);

// console.log("key::" + key.toString(CryptoJS.enc.Hex));

// console.log("iv::" + iv.toString(CryptoJS.enc.Hex));

// var value = 'test123';

// var encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key, {

//     mode: CryptoJS.mode.CBC,

//     padding: CryptoJS.pad.Pkcs7,

//     iv: iv

// });

// var encryptDataHex = encryptData.ciphertext.toString(CryptoJS.enc.Hex);

// console.log(encryptDataHex);

export function aesEncrypy(value, nonce) {
  let key = CryptoJS.enc.Utf8.parse('5ffF03b858D5Fd16')
  let iv = CryptoJS.enc.Utf8.parse(nonce)
  let encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
    iv: iv })
  let encryptDataHex = encryptData.ciphertext.toString(CryptoJS.enc.Hex)
  // let encryptDataHex = encryptData.ciphertext.toString();
  // let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);
  return encryptDataHex
  // return encryptedHexStr;
}

export function aesDecrypt(encryptDataHex, iv) {
  let key = CryptoJS.enc.Utf8.parse('5ffF03b858D5Fd16')
  let base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(encryptDataHex))
  let bytes = CryptoJS.AES.decrypt(base64, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: iv
  })
  let result = bytes.toString(CryptoJS.enc.Utf8)
  return result
}
export function md5encode(word) {
  return CryptoJS.MD5(word).toString()
}
