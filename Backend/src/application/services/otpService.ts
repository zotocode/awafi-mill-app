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

