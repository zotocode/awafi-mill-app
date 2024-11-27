import { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import jwt from "jsonwebtoken";
import tokens from "razorpay/dist/types/tokens";

export type jwtOutput = {
  payload: JwtPayload | null;
  message: string;
};

export class JWT implements Ijwt {
  constructor() {}

  generateToken(payload: object, expiresIn: string | number,secretKey:string): string {
    return jwt.sign(payload, secretKey, {
      expiresIn,
    });
  }


  verifyToken(token: string,secretKey:string): any {
    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      return {
        payload: decoded,
        message: "Authenticated",
      };
    } catch (error: any) {
      return {
        payload: null,
        message: error.message,
      };
    }
  }


}
