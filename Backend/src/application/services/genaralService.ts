import crypto from "crypto";

export const generateOTP = (): string => {

  const digits = '0123456789'; 
  let OTP = '';               
  const bytes = crypto.randomBytes(4); 

  for (let i = 0; i < 4; i++) { 
      OTP += digits[bytes[i] % 10]; 
  }
  return OTP;
};

export function generateRandomId(length: number = 10): string {
  const prefix = 'AWM';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomLength = length - prefix.length; // Adjust for the prefix length
  let randomId = prefix;
  
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }
  
  return randomId;
}



